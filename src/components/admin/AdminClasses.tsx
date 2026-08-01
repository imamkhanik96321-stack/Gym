import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, Users, Clock, MapPin, Plus } from 'lucide-react';

export const AdminClasses: React.FC = () => {
  const { classes, bookClass } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-orange-400" />
            <span>Group Class Schedule Manager</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Manage studio bookings, capacity, and coach schedules.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((c) => {
          const isFull = c.bookedCount >= c.capacity;
          return (
            <div key={c.id} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {c.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-semibold">{c.dayOfWeek}</span>
                </div>

                <h3 className="text-lg font-black text-white">{c.title}</h3>

                <div className="flex items-center gap-3 my-3">
                  <img src={c.instructorAvatar} alt={c.instructorName} className="w-9 h-9 rounded-full object-cover border border-orange-500/40" />
                  <div>
                    <p className="text-xs font-bold text-white">{c.instructorName}</p>
                    <p className="text-[10px] text-zinc-400">{c.room}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-zinc-400 pt-3 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span>Time:</span>
                    <span className="font-bold text-white">{c.startTime} ({c.durationMinutes} mins)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Capacity:</span>
                    <span className={`font-bold ${isFull ? 'text-red-400' : 'text-emerald-400'}`}>
                      {c.bookedCount} / {c.capacity} Reserved
                    </span>
                  </div>
                </div>
              </div>

              <button
                disabled={isFull}
                onClick={() => bookClass(c.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  isFull
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-400 text-black shadow-md'
                }`}
              >
                {isFull ? 'Class Fully Booked' : 'Reserve Spot'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
