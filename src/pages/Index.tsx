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
import { InfoSections } from '@/components/InfoSections';
import { FAQ } from '@/components/FAQ';
import { AboutService, PrivacyPolicy, TermsOfService } from '@/components/LegalPages';
import { APIDocumentation } from '@/components/APIDocumentation';

const Index = () => {
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogoClick = () => {
    setShowDashboard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (user?.isAdmin) {
    return (
      <>
        <Header onProfileClick={() => {}} onLogoClick={handleLogoClick} />
        <AdminPanel />
      </>
    );
  }

  if (showDashboard && user) {
    return (
      <>
        <Header onProfileClick={() => {}} onLogoClick={handleLogoClick} />
        <UserDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onProfileClick={() => setShowDashboard(true)} onLogoClick={handleLogoClick} />
      <Hero />
      <UploadSection />
      <Pricing />
      <Reviews />
      <InfoSections />
      <SupportChat />
      <Footer />
    </div>
  );
};

export default Index;