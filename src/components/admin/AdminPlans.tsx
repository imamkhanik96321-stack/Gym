import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Flame, Check, ShieldCheck, Plus } from 'lucide-react';

export const AdminPlans: React.FC = () => {
  const { plans, settings } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-400" />
            <span>Membership Plans & Tier Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Configure subscription pricing, duration, and feature perks.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">{p.name}</h3>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {p.tier} TIER
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">{p.description}</p>

              <div className="my-6">
                <span className="text-4xl font-black text-white">{settings.currencySymbol}{p.price}</span>
                <span className="text-xs text-zinc-500 font-semibold"> / month</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-zinc-800">
                {p.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
