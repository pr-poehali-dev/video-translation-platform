import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

type Plan = 'free' | 'hd' | 'fullhd' | 'ultra';

interface SubscriptionContextType {
  balance: number;
  plan: Plan;
  videoQuality: 'HD' | 'Full HD' | '4K';
  notificationTypes: string[];
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
  getQualityByBalance: () => 'HD' | 'Full HD' | '4K';
  getNotificationsByBalance: () => string[];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      const savedBalance = localStorage.getItem(`balance_${user.id}`);
      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      }
    }
  }, [user]);

  const addBalance = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    if (user) {
      localStorage.setItem(`balance_${user.id}`, newBalance.toString());
    }
  };

  const deductBalance = (amount: number): boolean => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      if (user) {
        localStorage.setItem(`balance_${user.id}`, newBalance.toString());
      }
      return true;
    }
    return false;
  };

  const getQualityByBalance = (): 'HD' | 'Full HD' | '4K' => {
    if (balance >= 500) return '4K';
    if (balance >= 200) return 'Full HD';
    return 'HD';
  };

  const getNotificationsByBalance = (): string[] => {
    if (balance >= 500) return ['email', 'sms', 'push'];
    if (balance >= 200) return ['email', 'sms'];
    if (balance > 0) return ['email'];
    return [];
  };

  const getPlan = (): Plan => {
    if (balance >= 500) return 'ultra';
    if (balance >= 200) return 'fullhd';
    if (balance > 0) return 'hd';
    return 'free';
  };

  return (
    <SubscriptionContext.Provider
      value={{
        balance,
        plan: getPlan(),
        videoQuality: getQualityByBalance(),
        notificationTypes: getNotificationsByBalance(),
        addBalance,
        deductBalance,
        getQualityByBalance,
        getNotificationsByBalance,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
