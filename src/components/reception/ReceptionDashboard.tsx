import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QrCode, UserPlus, CreditCard, PhoneCall, Search, CheckCircle2, AlertTriangle, Dumbbell } from 'lucide-react';

interface ReceptionDashboardProps {
  onOpenQRScanner: () => void;
}

export const ReceptionDashboard: React.FC<ReceptionDashboardProps> = ({ onOpenQRScanner }) => {
  const { members, recordCheckIn, trialBookings, addTrialBooking, addPayment, plans, settings } = useAuth();

  const [searchCode, setSearchCode] = useState('');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string; member?: any } | null>(null);

  // Quick Walk-in Sales State
  const [walkinName, setWalkinName] = useState('');
  const [walkinEmail, setWalkinEmail] = useState('');
  const [walkinPlan, setWalkinPlan] = useState(plans[0]?.id || 'plan-1');
  const [saleDone, setSaleDone] = useState(false);

  const handleDeskCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode) return;
    const res = recordCheckIn(searchCode);
    setScanResult(res);
  };

  const handleWalkinSale = (e: React.FormEvent) => {
    e.preventDefault();
    const selPlan = plans.find((p) => p.id === walkinPlan);
    if (!selPlan) return;

    addPayment({
      memberId: `mem-${Date.now()}`,
      memberName: walkinName,
      planName: selPlan.name,
      amount: selPlan.price,
      currency: settings.currencySymbol,
      paymentMethod: 'cash',
      status: 'paid',
      transactionId: `txn_DESK_CASH_${Math.floor(10000 + Math.random() * 90000)}`,
      invoiceId: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
    });
    setSaleDone(true);
    setTimeout(() => {
      setSaleDone(false);
      setWalkinName('');
      setWalkinEmail('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-black border border-purple-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
              FRONT DESK OPERATIONS
            </span>
            <h1 className="text-2xl font-black text-white mt-1">Reception Desk Command Center</h1>
            <p className="text-xs text-zinc-400">Fast check-in verification, walk-in sales, and phone trial bookings.</p>
          </div>

          <button
            onClick={onOpenQRScanner}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-xl flex items-center gap-2 hover:brightness-110 cursor-pointer transition-all"
          >
            <QrCode className="w-5 h-5" />
            <span>Launch Desk Camera Scanner</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Rapid Desk Check-in Box */}
        <div className="lg:col-span-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <QrCode className="w-5 h-5 text-orange-400" />
            <span>Rapid Member Desk Check-In</span>
          </h3>

          <form onSubmit={handleDeskCheckIn} className="flex gap-2">
            <input
              type="text"
              placeholder="Scan/Type Barcode, QR code, or Phone Number..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-orange-500 text-black font-extrabold text-xs shadow-lg hover:bg-orange-400 cursor-pointer"
            >
              Verify Pass
            </button>
          </form>

          {/* Quick Member Pass Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {members.slice(0, 4).map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSearchCode(m.qrCode);
                  const res = recordCheckIn(m.qrCode);
                  setScanResult(res);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-300 font-mono hover:border-orange-500 cursor-pointer"
              >
                {m.qrCode} ({m.name.split(' ')[0]})
              </button>
            ))}
          </div>

          {scanResult && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 animate-in fade-in ${
                scanResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              {scanResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />}
              <div>
                <p className="text-xs font-bold">{scanResult.message}</p>
                {scanResult.member && (
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Plan: <span className="font-bold text-white">{scanResult.member.membershipPlanName}</span> • Exp: {scanResult.member.endDate}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Walk-in Sales OTC Box */}
        <div className="lg:col-span-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-400" />
            <span>Over-the-Counter Cash / UPI Sales</span>
          </h3>

          <form onSubmit={handleWalkinSale} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Guest Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jason Thorne"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="jason@example.com"
                  value={walkinEmail}
                  onChange={(e) => setWalkinEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Membership Plan</label>
              <select
                value={walkinPlan}
                onChange={(e) => setWalkinPlan(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({settings.currencySymbol}{p.price})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all"
            >
              Collect Cash Payment & Print Receipt
            </button>

            {saleDone && (
              <p className="text-xs font-bold text-emerald-400 text-center animate-pulse">
                ✓ Over-the-counter transaction recorded & invoice generated!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
