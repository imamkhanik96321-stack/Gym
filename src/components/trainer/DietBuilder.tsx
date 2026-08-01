import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Meal } from '../../types';
import { Utensils, Plus, Trash2, Save, Sparkles, Flame } from 'lucide-react';

export const DietBuilder: React.FC = () => {
  const { dietPlan, updateDietPlan } = useAuth();
  const [meals, setMeals] = useState<Meal[]>(dietPlan.meals);
  const [targetCalories, setTargetCalories] = useState(dietPlan.targetCalories);
  const [targetProteinG, setTargetProteinG] = useState(dietPlan.targetProteinG);
  const [targetCarbsG, setTargetCarbsG] = useState(dietPlan.targetCarbsG);
  const [targetFatsG, setTargetFatsG] = useState(dietPlan.targetFatsG);
  const [saved, setSaved] = useState(false);

  const [newMealTitle, setNewMealTitle] = useState('');
  const [newMealTime, setNewMealTime] = useState('02:00 PM');
  const [newMealCal, setNewMealCal] = useState(500);

  const handleAddMeal = () => {
    if (!newMealTitle) return;
    const added: Meal = {
      id: `m-${Date.now()}`,
      time: newMealTime,
      title: newMealTitle,
      foodItems: ['Sample Protein Item', 'Complex Carbohydrates'],
      calories: newMealCal,
      proteinG: Math.round(newMealCal * 0.08),
      carbsG: Math.round(newMealCal * 0.1),
      fatsG: Math.round(newMealCal * 0.02),
    };
    setMeals([...meals, added]);
    setNewMealTitle('');
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter((m) => m.id !== id));
  };

  const handleSavePlan = () => {
    updateDietPlan({
      ...dietPlan,
      targetCalories,
      targetProteinG,
      targetCarbsG,
      targetFatsG,
      meals,
      updatedAt: new Date().toISOString().split('T')[0],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Utensils className="w-6 h-6 text-orange-400" />
            <span>Macro Precision Nutrition Builder</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Design daily meal structures, protein targets, and hydration goals.</p>
        </div>

        <button
          onClick={handleSavePlan}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Diet Plan Published!' : 'Publish Diet Matrix'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Targets Settings */}
        <div className="lg:col-span-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Daily Macro Targets</span>
          </h3>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Target Calories (kcal)</label>
            <input
              type="number"
              value={targetCalories}
              onChange={(e) => setTargetCalories(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-bold text-orange-400"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">Protein (g)</label>
              <input
                type="number"
                value={targetProteinG}
                onChange={(e) => setTargetProteinG(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">Carbs (g)</label>
              <input
                type="number"
                value={targetCarbsG}
                onChange={(e) => setTargetCarbsG(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">Fats (g)</label>
              <input
                type="number"
                value={targetFatsG}
                onChange={(e) => setTargetFatsG(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-orange-400">Add Meal Time Slot</h4>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Meal Title</label>
              <input
                type="text"
                placeholder="e.g. Post-Workout Anabolic Shake"
                value={newMealTitle}
                onChange={(e) => setNewMealTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Estimated Calories</label>
              <input
                type="number"
                value={newMealCal}
                onChange={(e) => setNewMealCal(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>

            <button
              onClick={handleAddMeal}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-orange-400" />
              <span>Add Meal Slot</span>
            </button>
          </div>
        </div>

        {/* Meals Schedule */}
        <div className="lg:col-span-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white">Meal Schedule & Ingredients</h3>

          <div className="space-y-3">
            {meals.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-orange-400 font-mono">
                      {m.time}
                    </span>
                    <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {m.foodItems.join(', ')}
                  </p>
                  <p className="text-[10px] text-orange-400 font-bold mt-1">
                    {m.calories} kcal • {m.proteinG}g Protein • {m.carbsG}g Carbs • {m.fatsG}g Fats
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteMeal(m.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
