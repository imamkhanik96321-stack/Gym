import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { QrCode, CheckCircle2, Clock, Building2, Search } from 'lucide-react';

interface AdminAttendanceProps {
  onOpenQRScanner: () => void;
}

export const AdminAttendance: React.FC<AdminAttendanceProps> = ({ onOpenQRScanner }) => {
  const { attendances } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <QrCode className="w-6 h-6 text-orange-400" />
            <span>QR Desk Check-In Log</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time facility access verification and entry logs.</p>
        </div>

        <button
          onClick={onOpenQRScanner}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 cursor-pointer transition-all"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch Camera Desk Scanner</span>
        </button>
      </div>

      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Member Name</th>
                <th className="p-4">QR Pass Barcode</th>
                <th className="p-4">Check-In Timestamp</th>
                <th className="p-4">Branch Location</th>
                <th className="p-4 text-right">Access Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {attendances.map((att) => (
                <tr key={att.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{att.memberName}</td>
                  <td className="p-4 font-mono text-orange-400 font-bold">{att.qrCode}</td>
                  <td className="p-4 text-zinc-300">{att.checkInTime}</td>
                  <td className="p-4 text-zinc-400">{att.branch}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      GRANTED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
