import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Exercise } from '../../types';
import { Dumbbell, Plus, Trash2, Save, Video, CheckCircle2 } from 'lucide-react';

export const WorkoutBuilder: React.FC = () => {
  const { workoutPlan, updateWorkoutPlan } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>(workoutPlan.exercises);
  const [title, setTitle] = useState(workoutPlan.title);
  const [goal, setGoal] = useState(workoutPlan.goal);
  const [saved, setSaved] = useState(false);

  const [newEx, setNewEx] = useState({
    name: '',
    category: 'chest' as const,
    sets: 4,
    reps: '8-10 reps',
    weightKg: 60,
    restSeconds: 60,
    instructions: 'Maintain strict posture',
  });

  const handleAddExercise = () => {
    if (!newEx.name) return;
    const added: Exercise = {
      id: `ex-${Date.now()}`,
      ...newEx,
      completed: false,
    };
    setExercises([...exercises, added]);
    setNewEx({ ...newEx, name: '' });
  };

  const handleDeleteExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const handleSavePlan = () => {
    updateWorkoutPlan({
      ...workoutPlan,
      title,
      goal,
      exercises,
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
            <Dumbbell className="w-6 h-6 text-orange-400" />
            <span>Interactive Workout Split Builder</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Design progressive overload routines for assigned athlete members.</p>
        </div>

        <button
          onClick={handleSavePlan}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? 'Plan Published!' : 'Publish Workout Routine'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Plan Header Form */}
        <div className="lg:col-span-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white">Routine Information</h3>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Routine Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Target Fitness Objective</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-orange-400">Add New Exercise Item</h4>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Exercise Name</label>
              <input
                type="text"
                placeholder="e.g. Incline Dumbbell Press"
                value={newEx.name}
                onChange={(e) => setNewEx({ ...newEx, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Sets</label>
                <input
                  type="number"
                  value={newEx.sets}
                  onChange={(e) => setNewEx({ ...newEx, sets: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">Reps</label>
                <input
                  type="text"
                  value={newEx.reps}
                  onChange={(e) => setNewEx({ ...newEx, reps: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={handleAddExercise}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <Plus className="w-4 h-4 text-orange-400" />
              <span>Add Exercise to List</span>
            </button>
          </div>
        </div>

        {/* Exercises List */}
        <div className="lg:col-span-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Exercises Sequence ({exercises.length} Exercises)</span>
            <span className="text-xs text-orange-400 font-mono">Updated: {workoutPlan.updatedAt}</span>
          </h3>

          <div className="space-y-3">
            {exercises.map((ex, idx) => (
              <div key={ex.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 font-mono font-bold text-xs flex items-center justify-center border border-orange-500/20">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ex.name}</h4>
                    <p className="text-[10px] text-zinc-400">
                      {ex.sets} Sets × {ex.reps} @ {ex.weightKg || 0}kg • Rest: {ex.restSeconds}s
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{ex.instructions}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteExercise(ex.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
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
