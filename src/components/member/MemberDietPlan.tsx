import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Utensils, Flame, Droplets, CheckCircle2, Award } from 'lucide-react';

export const MemberDietPlan: React.FC = () => {
  const { dietPlan, toggleMealComplete } = useAuth();
  const [waterGlasses, setWaterGlasses] = useState(8);

  const completedCalories = dietPlan.meals.filter((m) => m.completed).reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-400" />
            <span>Macro Precision Diet Plan</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Prescribed daily nutrition and meal schedules.</p>
        </div>
      </div>

      {/* Target Macro Summary */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center glass-panel">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">Target Calories</p>
          <p className="text-2xl font-black text-white mt-1">{dietPlan.targetCalories} kcal</p>
          <p className="text-[10px] text-orange-400 font-bold mt-0.5">{completedCalories} kcal Consumed</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center glass-panel">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">Protein Target</p>
          <p className="text-2xl font-black text-orange-400 mt-1">{dietPlan.targetProteinG}g</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center glass-panel">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">Carbohydrates</p>
          <p className="text-2xl font-black text-amber-400 mt-1">{dietPlan.targetCarbsG}g</p>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center glass-panel">
          <p className="text-[10px] font-bold text-zinc-500 uppercase">Healthy Fats</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">{dietPlan.targetFatsG}g</p>
        </div>
      </div>

      {/* Meals Checklist */}
      <div className="space-y-4">
        {dietPlan.meals.map((m) => (
          <div
            key={m.id}
            onClick={() => toggleMealComplete(m.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer glass-panel ${
              m.completed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-zinc-900/60 border-zinc-800 hover:border-orange-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${m.completed ? 'bg-emerald-500 text-black' : 'bg-zinc-950 border border-zinc-800 text-zinc-600'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-950 text-orange-400 font-mono">
                      {m.time}
                    </span>
                    <h3 className={`text-sm font-bold ${m.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{m.foodItems.join(' • ')}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-extrabold text-orange-400">{m.calories} kcal</p>
                <p className="text-[10px] text-zinc-400">{m.proteinG}g P | {m.carbsG}g C | {m.fatsG}g F</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
