import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  QrCode,
  CalendarDays,
  Utensils,
  Receipt,
  BarChart3,
  HelpCircle,
  Settings,
  Flame,
  UserCheck,
  Video,
  Award,
  LineChart,
  User,
  ClipboardList,
  MessageSquare,
  Sparkles,
  PhoneCall,
  UserPlus,
  BookOpen,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentRole, members, trainers, supportTickets, attendances } = useAuth();

  if (currentRole === 'public') return null;

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'members', label: 'Members', icon: <Users className="w-4 h-4" />, badge: members.length },
    { id: 'trainers', label: 'Trainers', icon: <Dumbbell className="w-4 h-4" />, badge: trainers.length },
    { id: 'plans', label: 'Membership Plans', icon: <Flame className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments & Revenue', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'attendance', label: 'QR Attendance', icon: <QrCode className="w-4 h-4" />, badge: attendances.length },
    { id: 'classes', label: 'Group Classes', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'workouts', label: 'Workout Templates', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'diets', label: 'Diet Templates', icon: <Utensils className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <Receipt className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'support', label: 'Support Tickets', icon: <HelpCircle className="w-4 h-4" />, badge: supportTickets.filter((t) => t.status !== 'resolved').length },
    { id: 'settings', label: 'System & Database SQL', icon: <Settings className="w-4 h-4" /> },
  ];

  const trainerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'members', label: 'Assigned Members', icon: <Users className="w-4 h-4" /> },
    { id: 'workout_builder', label: 'Workout Builder', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'diet_builder', label: 'Diet Plan Builder', icon: <Utensils className="w-4 h-4" /> },
    { id: 'schedule', label: 'Appointments & Schedule', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'chat', label: 'Member Chat', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const memberNav = [
    { id: 'dashboard', label: 'Overview & Pass', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'daily_workout', label: 'Daily Workout', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'diet_plan', label: 'Diet & Water Tracker', icon: <Utensils className="w-4 h-4" /> },
    { id: 'progress', label: 'Body Metrics & Photos', icon: <LineChart className="w-4 h-4" /> },
    { id: 'exercises', label: 'Exercise Video Vault', icon: <Video className="w-4 h-4" /> },
    { id: 'classes', label: 'Book Group Class', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'trainer_chat', label: 'Trainer Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices & Renewal', icon: <Receipt className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
  ];

  const receptionNav = [
    { id: 'dashboard', label: 'Reception Desk', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'walkin', label: 'Walk-in Registration', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'quick_checkin', label: 'Quick QR Check-In', icon: <QrCode className="w-4 h-4" /> },
    { id: 'pos_sales', label: 'Over-counter Sales', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'trial_bookings', label: 'Trial Enquiries', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  let currentNav = adminNav;
  if (currentRole === 'trainer') currentNav = trainerNav;
  if (currentRole === 'member') currentNav = memberNav;
  if (currentRole === 'receptionist') currentNav = receptionNav;

  return (
    <aside className="w-64 shrink-0 hidden lg:block h-[calc(100vh-61px)] sticky top-[61px] bg-white/[0.02] backdrop-blur-2xl border-r border-white/10 p-4 overflow-y-auto z-20">
      <div className="mb-4 px-3 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00]">
            {currentRole} WORKSPACE
          </span>
        </div>
      </div>

      <nav className="space-y-1">
        {currentNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/10 border border-white/15 text-[#FF6A00] font-semibold shadow-md backdrop-blur-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-[#FF6A00]' : 'text-zinc-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#FF6A00] text-black'
                      : 'bg-white/10 text-zinc-300 border border-white/10'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Pro Note */}
      <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-center backdrop-blur-md">
        <div className="inline-flex p-2 rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/20 mb-2">
          <Sparkles className="w-4 h-4 text-[#FF6A00]" />
        </div>
        <p className="text-xs font-bold text-zinc-200">Royal Fitness Portal v3.4</p>
        <p className="text-[10px] text-zinc-400 mt-0.5">PostgreSQL Engine Active</p>
      </div>
    </aside>
  );
};
