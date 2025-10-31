import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление отзывами (создание, получение, модерация)
    Args: event - dict с httpMethod, body (user_id, rating, comment)
          context - object с request_id
    Returns: HTTP response с отзывами или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Admin',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        cur.execute("""
            SELECT r.id, r.rating, r.comment, r.created_at, u.name as user_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.is_approved = TRUE
            ORDER BY r.created_at DESC
            LIMIT 50
        """)
        reviews = cur.fetchall()
        
        cur.close()
        conn.close()
        
        reviews_list = []
        for review in reviews:
            reviews_list.append({
                'id': review['id'],
                'rating': review['rating'],
                'comment': review['comment'],
                'userName': review['user_name'],
                'createdAt': review['created_at'].isoformat() if review['created_at'] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'reviews': reviews_list})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id')
        rating = body_data.get('rating')
        comment = body_data.get('comment', '')
        
        if not user_id or not rating:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id and rating required'})
            }
        
        if rating < 1 or rating > 5:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'rating must be between 1 and 5'})
            }
        
        cur.execute(
            "INSERT INTO reviews (user_id, rating, comment) VALUES (%s, %s, %s) RETURNING id",
            (user_id, rating, comment)
        )
        result = cur.fetchone()
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'id': result['id'], 'message': 'Review submitted for moderation'})
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        review_id = body_data.get('review_id')
        is_approved = body_data.get('is_approved')
        
        if review_id is None or is_approved is None:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'review_id and is_approved required'})
            }
        
        cur.execute(
            "UPDATE reviews SET is_approved = %s WHERE id = %s",
            (is_approved, review_id)
        )
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'message': 'Review updated'})
        }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
