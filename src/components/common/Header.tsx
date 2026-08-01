import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  Dumbbell,
  Crown,
  Shield,
  User,
  QrCode,
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  Building2,
  Globe,
  LogOut,
  UserCheck,
  CreditCard,
  PhoneCall,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  onOpenQRScanner: () => void;
  onOpenAIChat: () => void;
  onOpenQRPass?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQRScanner,
  onOpenAIChat,
  onOpenQRPass,
  activeTab,
  setActiveTab,
}) => {
  const { currentRole, currentUser, switchRole, settings, activeBranch, setActiveBranch } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const rolesList: { role: UserRole; label: string; icon: React.ReactNode; desc: string; badge: string }[] = [
    { role: 'public', label: 'Public Website', icon: <Globe className="w-4 h-4 text-emerald-400" />, desc: 'Public Gym Website', badge: 'Visitor' },
    { role: 'admin', label: 'Admin Master Panel', icon: <Shield className="w-4 h-4 text-orange-400" />, desc: 'Full Gym Operations & Financials', badge: 'Owner' },
    { role: 'trainer', label: 'Trainer Hub', icon: <Dumbbell className="w-4 h-4 text-cyan-400" />, desc: 'Workout & Nutrition Builder', badge: 'Coach' },
    { role: 'receptionist', label: 'Front Desk Reception', icon: <PhoneCall className="w-4 h-4 text-purple-400" />, desc: 'Fast Check-In & Walk-Ins', badge: 'Staff' },
    { role: 'member', label: 'Member Portal', icon: <UserCheck className="w-4 h-4 text-amber-400" />, desc: 'Member Dashboard & Tracking', badge: 'Patient' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/[0.02] border-b border-white/10 backdrop-blur-2xl px-4 lg:px-8 py-3.5">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => switchRole('public')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6A00] via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-[#FF6A00]/25 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Crown className="w-3.5 h-3.5 text-amber-300 absolute top-0.5 left-1/2 -translate-x-1/2 drop-shadow" />
                <Dumbbell className="w-5 h-5 text-[#FF6A00] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300 mt-2" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  {settings.gymName}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/20">
                  Club
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block truncate max-w-[200px]">{settings.tagline}</p>
            </div>
          </button>

          {/* Branch Selector */}
          {currentRole !== 'public' && (
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
              <Building2 className="w-4 h-4 text-zinc-400" />
              <select
                value={activeBranch}
                onChange={(e) => setActiveBranch(e.target.value)}
                className="bg-white/5 text-xs text-zinc-200 border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FF6A00]/50 backdrop-blur-md cursor-pointer"
              >
                <option value="All Branches" className="bg-zinc-900">All Branches ({settings.branches.length})</option>
                {settings.branches.map((b) => (
                  <option key={b} value={b} className="bg-zinc-900">
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* AI Fitness Assistant Button */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer backdrop-blur-md"
            title="Ask PulseAI Fitness Assistant"
          >
            <Sparkles className="w-4 h-4 text-[#FF6A00] animate-pulse" />
            <span className="hidden sm:inline">PulseAI Assistant</span>
          </button>

          {/* QR Code Scanner (Admin/Staff/Reception) */}
          {(currentRole === 'admin' || currentRole === 'receptionist' || currentRole === 'trainer') && (
            <button
              onClick={onOpenQRScanner}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-medium transition-all cursor-pointer backdrop-blur-md"
              title="Desk Check-in QR Scanner"
            >
              <QrCode className="w-4 h-4 text-[#FF6A00]" />
              <span className="hidden md:inline">Scan QR Check-In</span>
            </button>
          )}

          {/* Member Digital Pass */}
          {currentRole === 'member' && onOpenQRPass && (
            <button
              onClick={onOpenQRPass}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-black font-bold text-xs shadow-lg shadow-[#FF6A00]/20 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Digital Pass</span>
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF6A00]/40 text-xs font-medium text-zinc-200 transition-all cursor-pointer backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="capitalize text-[#FF6A00] font-bold">{currentRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0a0a0a]/90 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Switch Demo Role</p>
                  <p className="text-xs text-zinc-300 font-medium">Test multi-role workflows instantly</p>
                </div>
                <div className="space-y-1">
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        currentRole === r.role
                          ? 'bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-white'
                          : 'hover:bg-white/5 text-zinc-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10">{r.icon}</div>
                        <div>
                          <p className="text-xs font-semibold text-zinc-100">{r.label}</p>
                          <p className="text-[10px] text-zinc-400">{r.desc}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 border border-white/10">
                        {r.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-[#FF6A00]/40 shadow-sm"
              />
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-zinc-200 truncate max-w-[120px]">{currentUser.name}</p>
                <p className="text-[10px] text-zinc-400 capitalize">{currentUser.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
