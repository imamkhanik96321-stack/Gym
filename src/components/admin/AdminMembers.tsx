import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Member } from '../../types';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  QrCode,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Dumbbell,
  Phone,
  Mail,
  ShieldCheck,
  X,
} from 'lucide-react';

interface AdminMembersProps {
  onOpenQRPass?: (member: Member) => void;
}

export const AdminMembers: React.FC<AdminMembersProps> = () => {
  const { members, plans, trainers, addMember, updateMember, deleteMember, settings } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'expired' | 'suspended'>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Member Form State
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    planId: plans[0]?.id || 'plan-1',
    trainerId: trainers[0]?.id || 'tr-1',
    branch: settings.branches[0],
    weightKg: 75,
    heightCm: 175,
    targetWeightKg: 70,
    age: 26,
    gender: 'male' as 'male' | 'female' | 'other',
    goal: 'muscle_gain' as 'muscle_gain' | 'fat_loss' | 'maintenance' | 'endurance' | 'rehab',
  });

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.membershipStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const selPlan = plans.find((p) => p.id === newMemberForm.planId);
    const selTrainer = trainers.find((t) => t.id === newMemberForm.trainerId);

    const startDate = new Date().toISOString().split('T')[0];
    const endDateObj = new Date();
    endDateObj.setMonth(endDateObj.getMonth() + (selPlan?.durationMonths || 1));
    const endDate = endDateObj.toISOString().split('T')[0];

    addMember({
      userId: `u-${Date.now()}`,
      name: newMemberForm.name,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      avatar: newMemberForm.avatar,
      membershipPlanId: newMemberForm.planId,
      membershipPlanName: selPlan?.name || 'Basic Strength',
      membershipStatus: 'active',
      startDate,
      endDate,
      trainerId: newMemberForm.trainerId,
      trainerName: selTrainer?.name || 'Unassigned',
      branch: newMemberForm.branch,
      emergencyContact: 'Family Contact (+1 555-000-0000)',
      weightKg: newMemberForm.weightKg,
      heightCm: newMemberForm.heightCm,
      targetWeightKg: newMemberForm.targetWeightKg,
      age: newMemberForm.age,
      gender: newMemberForm.gender,
      goal: newMemberForm.goal,
    });

    setShowAddModal(false);
  };

  const exportToCSV = () => {
    const headers = 'ID,Name,Email,Phone,Plan,Status,Branch,QR Code,Joined Date\n';
    const rows = filteredMembers
      .map(
        (m) =>
          `"${m.id}","${m.name}","${m.email}","${m.phone}","${m.membershipPlanName}","${m.membershipStatus}","${m.branch}","${m.qrCode}","${m.joinedDate}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IronTemple_Members_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-400" />
            <span>Member Directory & Accounts</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Manage active athlete memberships, QR passes, and body statistics.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Member Registration</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or QR barcode code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          {(['all', 'active', 'trial', 'expired', 'suspended'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-orange-500 text-black shadow'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Directory */}
      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Membership Plan</th>
                <th className="p-4">Assigned Coach</th>
                <th className="p-4">Status</th>
                <th className="p-4">QR Code</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-orange-500/40" />
                      <div>
                        <p className="font-bold text-white text-xs">{m.name}</p>
                        <p className="text-[10px] text-zinc-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-orange-300">{m.membershipPlanName}</td>
                  <td className="p-4 text-zinc-300">{m.trainerName || 'Unassigned'}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                        m.membershipStatus === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : m.membershipStatus === 'trial'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}
                    >
                      {m.membershipStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-orange-400 font-bold">{m.qrCode}</td>
                  <td className="p-4 text-zinc-400">{m.joinedDate}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MEMBER PROFILE DRAWER / MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-800 p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white">Member Profile Details</h3>
              <button onClick={() => setSelectedMember(null)} className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <img src={selectedMember.avatar} alt={selectedMember.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500" />
              <div>
                <h4 className="text-lg font-black text-white">{selectedMember.name}</h4>
                <p className="text-xs text-orange-400 font-semibold">{selectedMember.membershipPlanName}</p>
                <p className="text-[10px] text-zinc-400">QR Code: <span className="font-mono text-white font-bold">{selectedMember.qrCode}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Current Weight</p>
                <p className="text-lg font-black text-white">{selectedMember.weightKg} kg</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Target Goal</p>
                <p className="text-lg font-black text-orange-400 uppercase">{selectedMember.goal.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
              <p className="text-xs font-bold text-white mb-2">Account Contact & Branch</p>
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>{selectedMember.email}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>{selectedMember.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => {
                  const newStatus = selectedMember.membershipStatus === 'active' ? 'suspended' : 'active';
                  updateMember(selectedMember.id, { membershipStatus: newStatus });
                  setSelectedMember({ ...selectedMember, membershipStatus: newStatus });
                }}
                className="w-full py-3 rounded-xl bg-orange-500 text-black font-extrabold text-xs cursor-pointer"
              >
                Toggle Membership Status ({selectedMember.membershipStatus})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div className="pb-3 border-b border-zinc-800">
                <h3 className="text-base font-bold text-white">Register New Athlete Member</h3>
                <p className="text-xs text-zinc-400">Issue QR barcode pass and initialize body metrics profile</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 999-8888"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Select Plan</label>
                  <select
                    value={newMemberForm.planId}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, planId: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({settings.currencySymbol}{p.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Assign Coach</label>
                  <select
                    value={newMemberForm.trainerId}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, trainerId: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={newMemberForm.weightKg}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, weightKg: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newMemberForm.heightCm}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, heightCm: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Age</label>
                  <input
                    type="number"
                    value={newMemberForm.age}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, age: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all mt-2"
              >
                Create Member & Issue QR Pass
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
