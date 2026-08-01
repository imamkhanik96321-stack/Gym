import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { QrCode, X, Dumbbell, ShieldCheck, Download, Printer, Sparkles } from 'lucide-react';

interface QRPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRPassModal: React.FC<QRPassModalProps> = ({ isOpen, onClose }) => {
  const { members, currentUser, settings } = useAuth();

  if (!isOpen) return null;

  // Find member record
  const currentMember = members.find((m) => m.email === currentUser?.email) || members[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Digital Pass Card Frame */}
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-orange-500/40 p-6 shadow-2xl overflow-hidden glow-orange">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-500 text-black font-extrabold">
                <Dumbbell className="w-5 h-5 transform -rotate-45" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white tracking-wider uppercase">{settings.gymName}</p>
                <p className="text-[10px] text-orange-400 font-semibold tracking-widest uppercase">Digital Membership Pass</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ACTIVE
            </span>
          </div>

          {/* Member Details */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={currentMember.avatar}
              alt={currentMember.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
            />
            <div>
              <h3 className="text-base font-extrabold text-white">{currentMember.name}</h3>
              <p className="text-xs text-orange-400 font-medium">{currentMember.membershipPlanName}</p>
              <p className="text-[11px] text-zinc-400 mt-1">Branch: {currentMember.branch}</p>
              <p className="text-[10px] text-zinc-500">Valid: {currentMember.startDate} to {currentMember.endDate}</p>
            </div>
          </div>

          {/* Barcode / QR Section */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-center mb-4">
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
              {/* Simulated QR Pattern */}
              <div className="w-full h-full bg-black p-1 rounded grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[2px] ${
                      (i * 7 + 3) % 5 === 0 ? 'bg-white' : (i * 3) % 2 === 0 ? 'bg-orange-500' : 'bg-black'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="mt-3 flex items-center justify-center gap-1 h-8 opacity-80">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-800'} ${
                    i % 3 === 0 ? 'w-1.5' : 'w-0.5'
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-xs text-orange-400 font-bold mt-1 tracking-widest">{currentMember.qrCode}</p>
          </div>

          {/* Footer Note */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Membership</span>
            </div>
            <span className="text-zinc-500">ID: {currentMember.id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Print Pass</span>
          </button>
          <button
            onClick={() => alert(`Downloaded Pass: ${currentMember.qrCode}`)}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save to Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
};
