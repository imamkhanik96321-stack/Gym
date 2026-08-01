import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Exercise } from '../../types';
import { Dumbbell, Play, Pause, RotateCcw, CheckCircle2, Video, Timer, Flame, Sparkles, X } from 'lucide-react';

export const DailyWorkoutChecklist: React.FC = () => {
  const { workoutPlan, toggleExerciseComplete } = useAuth();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  // Rest Timer State
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const startRestTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-orange-400" />
            <span>Interactive Daily Workout Tracker</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">{workoutPlan.title} • Goal: {workoutPlan.goal}</p>
        </div>

        {/* Rest Timer Widget */}
        <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
          <Timer className="w-5 h-5 text-orange-400 animate-pulse" />
          <div>
            <p className="text-[10px] uppercase font-bold text-zinc-500">Rest Interval Timer</p>
            <p className="font-mono text-base font-black text-white">
              {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            className="p-2 rounded-xl bg-orange-500 text-black font-bold text-xs cursor-pointer hover:bg-orange-400"
          >
            {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setTimerSeconds(60);
              setTimerRunning(false);
            }}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exercises Checklist Cards */}
      <div className="space-y-4">
        {workoutPlan.exercises.map((ex) => (
          <div
            key={ex.id}
            className={`p-5 rounded-3xl border transition-all glass-panel ${
              ex.completed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-zinc-900/60 border-zinc-800 hover:border-orange-500/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleExerciseComplete(ex.id)}
                  className={`mt-1 p-2 rounded-xl transition-all cursor-pointer ${
                    ex.completed
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-600 hover:text-orange-400'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>

                <div>
                  <h3 className={`text-base font-bold ${ex.completed ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {ex.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-orange-400">{ex.sets} Sets × {ex.reps}</span>
                    <span className="text-xs text-zinc-400">• Weight: {ex.weightKg || 0}kg</span>
                    <span className="text-xs text-zinc-500">• Rest: {ex.restSeconds}s</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{ex.instructions}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startRestTimer(ex.restSeconds)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-orange-400 flex items-center gap-1.5 cursor-pointer"
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>Start {ex.restSeconds}s Rest</span>
                </button>

                {ex.videoUrl && (
                  <button
                    onClick={() => setSelectedVideoUrl(ex.videoUrl || null)}
                    className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
                    title="Watch Demonstration Video"
                  >
                    <Video className="w-4 h-4 text-orange-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-white mb-4">Exercise Technique Video Guide</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
              <iframe src={selectedVideoUrl} className="w-full h-full" title="Exercise Demo" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
