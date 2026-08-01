import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { postgresSchemaSql } from '../../data/initialData';
import { Settings, Database, Copy, Check, Save, RotateCcw, Building2, ShieldCheck, FileCode } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllData } = useAuth();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formSettings, setFormSettings] = useState({
    gymName: settings.gymName,
    tagline: settings.tagline,
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    taxRatePercent: settings.taxRatePercent,
    emailNotificationsEnabled: settings.emailNotificationsEnabled,
    whatsappNotificationsEnabled: settings.whatsappNotificationsEnabled,
  });

  const handleCopySql = () => {
    navigator.clipboard.writeText(postgresSchemaSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-orange-400" />
            <span>System Settings & PostgreSQL Schema</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Configure gym branding, multi-branch options, and export production database SQL.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Settings Form */}
        <div className="lg:col-span-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-400" />
            <span>General Gym Branding</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Gym Brand Name</label>
              <input
                type="text"
                value={formSettings.gymName}
                onChange={(e) => setFormSettings({ ...formSettings, gymName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Tagline</label>
              <input
                type="text"
                value={formSettings.tagline}
                onChange={(e) => setFormSettings({ ...formSettings, tagline: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={formSettings.currencySymbol}
                  onChange={(e) => setFormSettings({ ...formSettings, currencySymbol: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Sales Tax Rate (%)</label>
                <input
                  type="number"
                  value={formSettings.taxRatePercent}
                  onChange={(e) => setFormSettings({ ...formSettings, taxRatePercent: Number(e.target.value) })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formSettings.emailNotificationsEnabled}
                  onChange={(e) => setFormSettings({ ...formSettings, emailNotificationsEnabled: e.target.checked })}
                  className="rounded border-zinc-800 bg-zinc-950 text-orange-500 focus:ring-0"
                />
                <span>Enable Automated Email Expiry & Renewal Reminders</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formSettings.whatsappNotificationsEnabled}
                  onChange={(e) => setFormSettings({ ...formSettings, whatsappNotificationsEnabled: e.target.checked })}
                  className="rounded border-zinc-800 bg-zinc-950 text-orange-500 focus:ring-0"
                />
                <span>Enable WhatsApp QR Pass Dispatches</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saved ? 'Settings Saved!' : 'Save System Settings'}</span>
              </button>
              <button
                type="button"
                onClick={resetAllData}
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                title="Reset to initial seed state"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Seed</span>
              </button>
            </div>
          </form>
        </div>

        {/* Database SQL Schema Viewer & Exporter */}
        <div className="lg:col-span-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-orange-400" />
              <span>PostgreSQL / Supabase Production SQL</span>
            </h3>

            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-orange-400 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
            </button>
          </div>

          <p className="text-xs text-zinc-400">
            Copy and execute this complete PostgreSQL DDL schema in Supabase, Cloud SQL, or Neon to provision the backend database.
          </p>

          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-[11px] text-emerald-400/90 overflow-x-auto h-96 scrollbar-thin">
            <pre className="whitespace-pre">{postgresSchemaSql}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
