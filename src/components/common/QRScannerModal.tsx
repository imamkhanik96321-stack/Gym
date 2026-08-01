import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Member } from '../../types';
import { QrCode, X, CheckCircle2, AlertTriangle, Search, Camera, Dumbbell, Sparkles } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose }) => {
  const { recordCheckIn, members } = useAuth();
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string; member?: Member } | null>(null);

  if (!isOpen) return null;

  const handleCheckIn = (codeToScan: string) => {
    const res = recordCheckIn(codeToScan);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Desk Attendance Scanner</h3>
              <p className="text-xs text-zinc-400">Scan member QR pass or type barcode/phone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="my-6 relative rounded-2xl bg-zinc-950 border-2 border-dashed border-zinc-800 p-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-orange-500/5 animate-pulse pointer-events-none" />
          <div className="w-40 h-40 border-2 border-orange-500/60 rounded-2xl flex items-center justify-center relative shadow-inner">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-orange-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-orange-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-400" />
            <Camera className="w-12 h-12 text-zinc-600 animate-bounce" />
          </div>
          <p className="text-xs text-zinc-400 mt-4 font-medium">Position QR Code inside camera box</p>
        </div>

        {/* Manual Input / Quick Member Buttons */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              Manual Barcode / QR / Phone Entry
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="e.g. RFC-MEM-884920 or +91 98765 43210"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                onClick={() => handleCheckIn(inputCode)}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs rounded-xl hover:brightness-110 shadow-md cursor-pointer"
              >
                Check In
              </button>
            </div>
          </div>

          {/* Quick Demo Member Passes */}
          <div>
            <p className="text-[11px] font-semibold text-zinc-400 mb-2">Quick Test Member Passes:</p>
            <div className="flex flex-wrap gap-2">
              {members.slice(0, 3).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setInputCode(m.qrCode);
                    handleCheckIn(m.qrCode);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 text-[11px] text-zinc-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="font-mono text-orange-400">{m.qrCode}</span>
                  <span className="text-zinc-500">({m.name.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result Alert */}
          {result && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 animate-in zoom-in-95 ${
                result.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-xs font-bold">{result.message}</p>
                {result.member && (
                  <div className="mt-2 flex items-center gap-3 pt-2 border-t border-zinc-800">
                    <img
                      src={result.member.avatar}
                      alt={result.member.name}
                      className="w-9 h-9 rounded-full object-cover border border-orange-500"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{result.member.name}</p>
                      <p className="text-[10px] text-zinc-400">
                        {result.member.membershipPlanName} • Expires {result.member.endDate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
