import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PublicWebsite } from './components/public/PublicWebsite';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { QRScannerModal } from './components/common/QRScannerModal';
import { QRPassModal } from './components/common/QRPassModal';
import { AIChatModal } from './components/common/AIChatModal';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminMembers } from './components/admin/AdminMembers';
import { AdminTrainers } from './components/admin/AdminTrainers';
import { AdminPlans } from './components/admin/AdminPlans';
import { AdminPayments } from './components/admin/AdminPayments';
import { AdminAttendance } from './components/admin/AdminAttendance';
import { AdminClasses } from './components/admin/AdminClasses';
import { AdminSettings } from './components/admin/AdminSettings';

// Trainer Components
import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { WorkoutBuilder } from './components/trainer/WorkoutBuilder';
import { DietBuilder } from './components/trainer/DietBuilder';

// Member Components
import { MemberDashboard } from './components/member/MemberDashboard';
import { DailyWorkoutChecklist } from './components/member/DailyWorkoutChecklist';
import { MemberDietPlan } from './components/member/MemberDietPlan';
import { MemberProgress } from './components/member/MemberProgress';

// Reception Components
import { ReceptionDashboard } from './components/reception/ReceptionDashboard';

const AppContent: React.FC = () => {
  const { currentRole, switchRole, isAuthenticated, members } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewPublicSite, setViewPublicSite] = useState(false);

  // Global Modals State
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showQRPass, setShowQRPass] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  if (viewPublicSite || !isAuthenticated) {
    return (
      <PublicWebsite
        onSelectRole={(role) => {
          switchRole(role);
          setViewPublicSite(false);
          setActiveTab('dashboard');
        }}
        onSwitchToDashboard={() => {
          setViewPublicSite(false);
          setActiveTab('dashboard');
        }}
      />
    );
  }

  // Find logged-in or demo member for QR Pass
  const currentMemberObj = members[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 flex overflow-x-hidden selection:bg-orange-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQRScanner={() => setShowQRScanner(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          onOpenPublicWebsite={() => setViewPublicSite(true)}
          onOpenQRPass={() => setShowQRPass(true)}
          onOpenAIChat={() => setShowAIChat(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* ADMIN PANELS */}
          {currentRole === 'admin' && (
            <>
              {activeTab === 'dashboard' && (
                <AdminDashboard setActiveTab={setActiveTab} onOpenQRScanner={() => setShowQRScanner(true)} />
              )}
              {activeTab === 'members' && <AdminMembers />}
              {activeTab === 'trainers' && <AdminTrainers />}
              {activeTab === 'plans' && <AdminPlans />}
              {activeTab === 'payments' && <AdminPayments />}
              {activeTab === 'attendance' && (
                <AdminAttendance onOpenQRScanner={() => setShowQRScanner(true)} />
              )}
              {activeTab === 'classes' && <AdminClasses />}
              {activeTab === 'settings' && <AdminSettings />}
            </>
          )}

          {/* TRAINER PANELS */}
          {currentRole === 'trainer' && (
            <>
              {activeTab === 'dashboard' && <TrainerDashboard setActiveTab={setActiveTab} />}
              {activeTab === 'workout_builder' && <WorkoutBuilder />}
              {activeTab === 'diet_builder' && <DietBuilder />}
            </>
          )}

          {/* MEMBER PANELS */}
          {currentRole === 'member' && (
            <>
              {activeTab === 'dashboard' && (
                <MemberDashboard setActiveTab={setActiveTab} onOpenQRPass={() => setShowQRPass(true)} />
              )}
              {activeTab === 'daily_workout' && <DailyWorkoutChecklist />}
              {activeTab === 'diet_plan' && <MemberDietPlan />}
              {activeTab === 'progress' && <MemberProgress />}
            </>
          )}

          {/* RECEPTION PANELS */}
          {currentRole === 'reception' && (
            <>
              {activeTab === 'dashboard' && (
                <ReceptionDashboard onOpenQRScanner={() => setShowQRScanner(true)} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <QRScannerModal isOpen={showQRScanner} onClose={() => setShowQRScanner(false)} />
      <QRPassModal isOpen={showQRPass} onClose={() => setShowQRPass(false)} member={currentMemberObj} />
      <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
