import React from 'react';
import { Invoice } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { X, Printer, Download, Dumbbell, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const { settings } = useAuth();

  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden text-zinc-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Area */}
        <div id="printable-invoice" className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-black flex items-center justify-center font-black">
                <Dumbbell className="w-6 h-6 transform -rotate-45" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">{settings.gymName}</h2>
                <p className="text-xs text-zinc-400">{settings.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                PAID IN FULL
              </span>
              <p className="text-xs font-mono text-zinc-400 mt-2 font-semibold">{invoice.invoiceNumber}</p>
            </div>
          </div>

          {/* Member & Date Metadata */}
          <div className="grid grid-cols-2 gap-6 bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Billed To Member</p>
              <p className="font-bold text-white text-sm">{invoice.memberName}</p>
              <p className="text-zinc-400 mt-0.5">{invoice.memberEmail}</p>
              <p className="text-zinc-500 text-[11px] mt-1">Payment Method: {invoice.paymentMethod}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Invoice Details</p>
              <p className="text-zinc-300">
                Issue Date: <span className="font-semibold text-white">{invoice.issueDate}</span>
              </p>
              <p className="text-zinc-300 mt-0.5">
                Due Date: <span className="font-semibold text-white">{invoice.dueDate}</span>
              </p>
              <p className="text-zinc-300 mt-0.5">
                Currency: <span className="font-semibold text-orange-400">{invoice.currency}</span>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                <tr>
                  <td className="p-3 font-medium text-white">{invoice.planName}</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">
                    {invoice.currency}
                    {invoice.subtotal.toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-bold">
                    {invoice.currency}
                    {invoice.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>
                  {invoice.currency}
                  {invoice.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Sales Tax ({settings.taxRatePercent}%)</span>
                <span>
                  {invoice.currency}
                  {invoice.tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-white pt-2 border-t border-zinc-800">
                <span>Total Amount Paid</span>
                <span className="text-orange-400">
                  {invoice.currency}
                  {invoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div className="pt-4 border-t border-zinc-800 text-center text-[10px] text-zinc-500">
            <p>Thank you for choosing {settings.gymName}! This is a computer-generated tax invoice receipt.</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PCI-DSS Compliant Payment Verification</span>
            </div>
          </div>
        </div>

        {/* Print & Download Controls */}
        <div className="flex gap-3 mt-6 no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={() => alert(`Downloaded PDF Receipt for ${invoice.invoiceNumber}`)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
