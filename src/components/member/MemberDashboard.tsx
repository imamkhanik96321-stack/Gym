import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Dumbbell,
  QrCode,
  Flame,
  Utensils,
  Droplets,
  Award,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
  LineChart,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface MemberDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenQRPass: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ setActiveTab, onOpenQRPass }) => {
  const { members, currentUser, workoutPlan, dietPlan, toggleExerciseComplete, toggleMealComplete } = useAuth();

  const currentMember = members.find((m) => m.email === currentUser?.email) || members[0];
  const [waterGlasses, setWaterGlasses] = useState(6);

  const completedExercises = workoutPlan.exercises.filter((ex) => ex.completed).length;
  const totalExercises = workoutPlan.exercises.length;
  const workoutProgressPercent = Math.round((completedExercises / totalExercises) * 100);

  const completedMeals = dietPlan.meals.filter((m) => m.completed).length;
  const totalMeals = dietPlan.meals.length;

  return (
    <div className="space-y-6">
      {/* Top Banner with Pass Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-orange-500/30 shadow-2xl relative overflow-hidden glow-orange-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                ATHLETE PORTAL
              </span>
              <span className="text-xs text-emerald-400 font-bold">• Active Membership</span>
            </div>
            <h1 className="text-2xl font-black text-white">Welcome back, {currentMember.name}!</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Plan: <span className="text-orange-400 font-semibold">{currentMember.membershipPlanName}</span> • Branch: {currentMember.branch}
            </p>
          </div>

          <button
            onClick={onOpenQRPass}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-xl flex items-center gap-2.5 hover:brightness-110 cursor-pointer transition-all"
          >
            <QrCode className="w-5 h-5" />
            <span>View Digital Facility Pass</span>
          </button>
        </div>
      </div>

      {/* Daily Progress Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {/* Workout Progress */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-orange-400">{workoutProgressPercent}% Done</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Today's Workout Checklist</p>
          <p className="text-xl font-black text-white mt-1">
            {completedExercises} of {totalExercises} Completed
          </p>
          <div className="w-full bg-zinc-950 h-2 rounded-full mt-3 overflow-hidden border border-zinc-800">
            <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${workoutProgressPercent}%` }} />
          </div>
        </div>

        {/* Nutrition Calorie Goal */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-400">{completedMeals}/{totalMeals} Meals</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Target Daily Nutrition</p>
          <p className="text-xl font-black text-white mt-1">{dietPlan.targetCalories} kcal / {dietPlan.targetProteinG}g Protein</p>
          <p className="text-[11px] text-zinc-500 mt-1">High-protein anabolic split</p>
        </div>

        {/* Interactive Water Logger */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 glass-panel">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-cyan-400">{(waterGlasses * 0.35).toFixed(1)} / 3.5 Liters</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium">Daily Hydration Log</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xl font-black text-white">{waterGlasses} Glasses</p>
            <button
              onClick={() => setWaterGlasses((prev) => prev + 1)}
              className="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
            >
              +1 Glass
            </button>
          </div>
        </div>
      </div>

      {/* Today's Workout Routine Overview */}
      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-6 glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-orange-400" />
              <span>Today's Prescribed Routine: {workoutPlan.title}</span>
            </h3>
            <p className="text-xs text-zinc-400">Assigned by {currentMember.trainerName}</p>
          </div>

          <button
            onClick={() => setActiveTab('daily_workout')}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-orange-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Full Routine & Timer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {workoutPlan.exercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => toggleExerciseComplete(ex.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                ex.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-300'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${ex.completed ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${ex.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {ex.name}
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    {ex.sets} Sets × {ex.reps} @ {ex.weightKg || 0}kg
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                {ex.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
