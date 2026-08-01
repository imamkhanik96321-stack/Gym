import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Invoice } from '../../types';
import { CreditCard, Download, Search, CheckCircle2, Eye, Printer, ShieldCheck } from 'lucide-react';
import { InvoiceModal } from '../common/InvoiceModal';

export const AdminPayments: React.FC = () => {
  const { payments, invoices, settings } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.memberEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-orange-400" />
            <span>Financials & Invoice Records</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Total Revenue Collected: <span className="text-emerald-400 font-extrabold">{settings.currencySymbol}{totalRevenue.toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by invoice number or member name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] tracking-wider font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Member Name</th>
                <th className="p-4">Plan Billed</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-mono text-orange-400 font-bold">{inv.invoiceNumber}</td>
                  <td className="p-4 font-bold text-white">{inv.memberName}</td>
                  <td className="p-4 text-zinc-300">{inv.planName}</td>
                  <td className="p-4 font-extrabold text-emerald-400">
                    {inv.currency}
                    {inv.total.toFixed(2)}
                  </td>
                  <td className="p-4 text-zinc-400 uppercase text-[10px] font-bold">{inv.paymentMethod}</td>
                  <td className="p-4 text-zinc-400">{inv.issueDate}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      PAID
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-orange-400" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
    </div>
  );
};
