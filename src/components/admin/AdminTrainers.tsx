import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Star, Plus, Users, Award, Mail, Phone, Building2 } from 'lucide-react';

export const AdminTrainers: React.FC = () => {
  const { trainers } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-orange-400" />
            <span>Certified Trainer Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Monitor coach ratings, active client caseloads, and specialty disciplines.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {trainers.map((tr) => (
          <div key={tr.id} className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-6 glass-panel flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img src={tr.avatar} alt={tr.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md" />
                <div>
                  <h3 className="text-base font-bold text-white">{tr.name}</h3>
                  <p className="text-xs text-orange-400 font-semibold">{tr.branch}</p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{tr.rating}</span>
                    <span className="text-zinc-500 font-normal">({tr.experienceYears} yrs experience)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs mb-4">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-500">Assigned Clients:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    {tr.assignedMembersCount} Athletes
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-500">Direct Contact:</span>
                  <span className="font-mono text-[11px] text-zinc-400">{tr.phone}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-3">{tr.bio}</p>

              <div className="flex flex-wrap gap-1.5">
                {tr.specialty.map((sp, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-orange-300">
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
