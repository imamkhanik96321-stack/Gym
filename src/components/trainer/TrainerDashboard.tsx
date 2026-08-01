import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Users, Utensils, MessageSquare, CalendarDays, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrainerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const TrainerDashboard: React.FC<TrainerDashboardProps> = ({ setActiveTab }) => {
  const { members, currentUser, workoutPlan, dietPlan } = useAuth();

  const assignedMembers = members.filter((m) => m.trainerName?.includes('Marcus') || m.trainerName?.includes('Sarah') || true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-zinc-800/80 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Personal Trainer Command Hub
            </span>
            <h1 className="text-2xl font-black text-white mt-1">Welcome back, {currentUser?.name}!</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Manage client training, macro nutrition, and progressive overload splits.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('workout_builder')}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Workout Builder</span>
            </button>
            <button
              onClick={() => setActiveTab('diet_builder')}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Utensils className="w-4 h-4 text-orange-400" />
              <span>Diet Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 w-fit mb-3 text-orange-400">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs text-zinc-400">Assigned Athlete Clients</p>
          <p className="text-2xl font-black text-white mt-1">{assignedMembers.length} Active</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 w-fit mb-3 text-cyan-400">
            <Dumbbell className="w-5 h-5" />
          </div>
          <p className="text-xs text-zinc-400">Active Workout Split</p>
          <p className="text-base font-bold text-white mt-1 truncate">{workoutPlan.title}</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 w-fit mb-3 text-emerald-400">
            <Utensils className="w-5 h-5" />
          </div>
          <p className="text-xs text-zinc-400">Target Calorie Protocol</p>
          <p className="text-base font-bold text-white mt-1">{dietPlan.targetCalories} kcal / {dietPlan.targetProteinG}g Protein</p>
        </div>
      </div>

      {/* Assigned Members Table */}
      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-6 glass-panel space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-400" />
          <span>Assigned Athletes & Goal Tracking</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {assignedMembers.map((m) => (
            <div key={m.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover border border-orange-500/40" />
                <div>
                  <h4 className="text-xs font-bold text-white">{m.name}</h4>
                  <p className="text-[10px] text-orange-400 font-semibold">{m.membershipPlanName}</p>
                  <p className="text-[10px] text-zinc-400">Goal: <span className="uppercase font-bold text-zinc-300">{m.goal.replace('_', ' ')}</span></p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('workout_builder')}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-orange-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Edit Routine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
