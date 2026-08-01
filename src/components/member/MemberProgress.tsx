import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LineChart as ChartIcon, Plus, TrendingDown, Camera, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const MemberProgress: React.FC = () => {
  const { progressMeasurements, progressPhotos, addMeasurement } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState(78.0);
  const [newChest, setNewChest] = useState(107);
  const [newWaist, setNewWaist] = useState(80);

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    addMeasurement({
      memberId: 'mem-1',
      date: new Date().toISOString().split('T')[0],
      weightKg: newWeight,
      chestCm: newChest,
      waistCm: newWaist,
      bicepsCm: 39.5,
      thighsCm: 61,
      bodyFatPercentage: 14.0,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ChartIcon className="w-6 h-6 text-orange-400" />
            <span>Body Composition & Progress Tracking</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Weight trends, body measurements timeline, and progress photos vault.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Measurement</span>
        </button>
      </div>

      {/* Weight Chart */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 glass-panel">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Body Weight Loss / Gain Trajectory</h3>
            <p className="text-xs text-zinc-400">Target Weight: 74.0 kg</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            <span>-4.0 kg Total Progress</span>
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressMeasurements}>
              <XAxis dataKey="date" stroke="#52525b" fontSize={11} tickLine={false} />
              <YAxis stroke="#52525b" fontSize={11} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="weightKg" stroke="#FF6A00" strokeWidth={3} dot={{ fill: '#FF6A00', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Photos Side-by-Side Gallery */}
      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-orange-400" />
          <span>Transformation Progress Vault</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {progressPhotos.map((photo) => (
            <div key={photo.id} className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
              <img src={photo.photoUrl} alt={photo.type} className="w-full h-64 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {photo.type}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{photo.date}</span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">{photo.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Measurement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Log Today's Body Metrics</h3>
            <form onSubmit={handleAddMeasurement} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Chest (cm)</label>
                  <input
                    type="number"
                    value={newChest}
                    onChange={(e) => setNewChest(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    value={newWaist}
                    onChange={(e) => setNewWaist(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 text-black font-extrabold text-xs shadow-lg"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
