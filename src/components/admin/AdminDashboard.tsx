import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  CreditCard,
  QrCode,
  UserCheck,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Sparkles,
  CalendarDays,
  Dumbbell,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenQRScanner: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab, onOpenQRScanner }) => {
  const { members, trainers, payments, attendances, settings } = useAuth();

  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.membershipStatus === 'active').length;
  const todayAttendances = attendances.length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const expiringSoon = members.filter((m) => m.membershipStatus === 'active' || m.membershipStatus === 'trial');

  // Chart Data
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4200, target: 4000 },
    { month: 'Feb', revenue: 5800, target: 5000 },
    { month: 'Mar', revenue: 6400, target: 6000 },
    { month: 'Apr', revenue: 7100, target: 6500 },
    { month: 'May', revenue: 8900, target: 8000 },
    { month: 'Jun', revenue: 9500, target: 8500 },
    { month: 'Jul', revenue: 11200, target: 10000 },
    { month: 'Aug', revenue: 12800, target: 11000 },
  ];

  const peakAttendanceHours = [
    { hour: '06 AM', count: 28 },
    { hour: '08 AM', count: 65 },
    { hour: '10 AM', count: 32 },
    { hour: '02 PM', count: 20 },
    { hour: '05 PM', count: 88 },
    { hour: '07 PM', count: 94 },
    { hour: '09 PM', count: 42 },
  ];

  const memberStatusData = [
    { name: 'Active', value: activeMembers, color: '#10B981' },
    { name: 'Trial', value: members.filter((m) => m.membershipStatus === 'trial').length, color: '#F59E0B' },
    { name: 'Expired', value: members.filter((m) => m.membershipStatus === 'expired').length, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-zinc-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Executive Overview
            </span>
            <span className="text-xs text-zinc-400">• Live Operations</span>
          </div>
          <h1 className="text-2xl font-black text-white">{settings.gymName} Operations Command Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time revenue, QR check-ins, and membership lifecycle metrics.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setActiveTab('members')}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
          <button
            onClick={onOpenQRScanner}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <QrCode className="w-4 h-4 text-orange-400" />
            <span>Desk Check-In</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Active Members',
            value: `${activeMembers} / ${totalMembers}`,
            desc: '+12% growth this month',
            icon: <Users className="w-5 h-5 text-orange-400" />,
            badge: 'Active',
            badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          },
          {
            title: "Today's QR Check-ins",
            value: todayAttendances,
            desc: 'Peak hour 07:00 PM',
            icon: <QrCode className="w-5 h-5 text-amber-400" />,
            badge: 'Live',
            badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          },
          {
            title: 'Monthly Revenue',
            value: `${settings.currencySymbol}${totalRevenue.toLocaleString()}`,
            desc: '100% collected digitally',
            icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
            badge: '+18% MoM',
            badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          },
          {
            title: 'Active Trainers',
            value: trainers.length,
            desc: 'Average 4.9⭐ rating',
            icon: <Dumbbell className="w-5 h-5 text-cyan-400" />,
            badge: 'Coaches',
            badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          },
        ].map((card, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 glass-panel hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">{card.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeBg}`}>
                {card.badge}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium">{card.title}</p>
            <p className="text-2xl font-black text-white mt-1">{card.value}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 glass-panel">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Revenue Growth</h3>
              <p className="text-xs text-zinc-400">Actual Revenue vs Projection Target</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>Target Exceeded</span>
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF6A00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FF6A00" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Membership Status Distribution */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 glass-panel flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Member Status Breakdown</h3>
            <p className="text-xs text-zinc-400">Active vs Trial vs Expired</p>

            <div className="h-48 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={memberStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                    {memberStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-zinc-800">
            {memberStatusData.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-zinc-300">{m.name} Members</span>
                </div>
                <span className="font-bold text-white">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Hours & Recent Registrations */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Peak Hours Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 glass-panel">
          <h3 className="text-base font-bold text-white mb-1">Peak Attendance Traffic Hours</h3>
          <p className="text-xs text-zinc-400 mb-6">Hourly QR scanner volume distribution</p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakAttendanceHours}>
                <XAxis dataKey="hour" stroke="#52525b" fontSize={11} tickLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Directory Quick Preview */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 glass-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Recent Member Directory</h3>
            <button
              onClick={() => setActiveTab('members')}
              className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {members.slice(0, 4).map((m) => (
              <div key={m.id} className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-orange-500/40" />
                  <div>
                    <p className="text-xs font-bold text-white">{m.name}</p>
                    <p className="text-[10px] text-zinc-400">{m.membershipPlanName} • {m.branch}</p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    m.membershipStatus === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : m.membershipStatus === 'trial'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}
                >
                  {m.membershipStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
