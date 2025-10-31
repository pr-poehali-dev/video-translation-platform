import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Pricing } from '@/components/Pricing';
import { Reviews } from '@/components/Reviews';
import { UploadSection } from '@/components/UploadSection';
import { SupportChat } from '@/components/SupportChat';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';
import { UserDashboard } from '@/components/UserDashboard';

const Index = () => {
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  if (user?.isAdmin) {
    return (
      <>
        <Header onProfileClick={() => {}} />
        <AdminPanel />
      </>
    );
  }

  if (showDashboard && user) {
    return (
      <>
        <Header onProfileClick={() => setShowDashboard(false)} />
        <UserDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onProfileClick={() => setShowDashboard(true)} />
      <Hero />
      <UploadSection />
      <Pricing />
      <Reviews />
      <SupportChat />
      <Footer />
    </div>
  );
};

export default Index;