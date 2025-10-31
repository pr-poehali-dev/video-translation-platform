import json
import os
import base64
import io
from typing import Dict, Any
import openai

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI-перевод аудио из видео с озвучкой на целевой язык
    Args: event - dict с httpMethod, body (base64 аудио), queryStringParameters (targetLang)
          context - object с request_id, function_name
    Returns: HTTP response с переведённой озвучкой в base64
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        audio_base64 = body_data.get('audio')
        target_lang = body_data.get('targetLang', 'en')
        
        if not audio_base64:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'No audio provided'})
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'OpenAI API key not configured'})
            }
            
        openai.api_key = api_key
        
        audio_bytes = base64.b64decode(audio_base64)
        
        audio_file = io.BytesIO(audio_bytes)
        audio_file.name = 'audio.mp3'
        
        transcript = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file,
            response_format="text"
        )
        
        lang_map = {
            'en': 'English',
            'es': 'Spanish', 
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ko': 'Korean'
        }
        target_language = lang_map.get(target_lang, 'English')
        
        translation = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "system",
                "content": f"You are a professional translator. Translate the following text to {target_language}. Preserve the tone and style."
            }, {
                "role": "user",
                "content": transcript
            }]
        )
        translated_text = translation.choices[0].message['content']
        
        voice_map = {
            'en': 'alloy',
            'es': 'nova',
            'fr': 'shimmer',
            'de': 'echo',
            'it': 'fable',
            'pt': 'onyx',
            'ru': 'alloy',
            'zh': 'nova',
            'ja': 'shimmer',
            'ko': 'echo'
        }
        selected_voice = voice_map.get(target_lang, 'alloy')
        
        speech_response = openai.Audio.create(
            model="tts-1",
            voice=selected_voice,
            input=translated_text
        )
        
        translated_audio_base64 = speech_response['data']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'audio': translated_audio_base64,
                'transcript': transcript,
                'translation': translated_text,
                'targetLang': target_lang
            })
        }
        
    except openai.error.RateLimitError as e:
        return {
            'statusCode': 429,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Превышен лимит запросов к OpenAI. Попробуйте позже.'})
        }
    except openai.error.InvalidRequestError as e:
        error_msg = str(e)
        if 'country' in error_msg.lower() or 'region' in error_msg.lower():
            return {
                'statusCode': 451,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'OpenAI API недоступен в вашем регионе. Обратитесь в поддержку для решения проблемы.'})
            }
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Некорректный запрос: {error_msg}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка обработки: {str(e)}'})
        }