import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownLeft, ArrowLeft, Check } from 'lucide-react';

export function DepositPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!user || !profile) { navigate('/login'); return null; }

  const presets = [10, 50, 100, 200, 500];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const num = parseFloat(amount);
    if (!num || num < 1) { setError('Minimum deposit is $1'); return; }

    setLoading(true);
    const { error: insertErr } = await supabase.from('deposits').insert({
      user_id: user.id,
      amount: num,
    });

    if (insertErr) {
      setError(insertErr.message);
    } else {
      setSuccess(true);
      setAmount('');
      refreshProfile();
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-emerald-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Deposit Submitted</h2>
          <p className="text-surface-200/60 text-sm mb-6">Your deposit request is pending approval. You'll be notified once it's processed.</p>
          <Link to="/dashboard" className="inline-block bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md">
        <Link to="/dashboard" className="flex items-center gap-1.5 text-surface-200/60 hover:text-white text-xs transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <ArrowDownLeft size={22} className="text-emerald-400" />
          <h1 className="font-display text-2xl font-bold text-white">Deposit</h1>
        </div>
        <p className="text-surface-200/60 text-sm mb-6">Add funds to your trading account</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>}

        <div className="flex flex-wrap gap-2 mb-5">
          {presets.map((p) => (
            <button key={p} type="button" onClick={() => setAmount(String(p))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${amount === String(p) ? 'bg-primary-600 text-white' : 'bg-surface-900/60 border border-surface-800 text-surface-200 hover:border-primary-700/50 hover:text-white'}`}>
              ${p}
            </button>
          ))}
        </div>

        <form onSubmit={handleDeposit} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/40 text-sm">$</span>
              <input type="number" min="1" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-surface-900/60 border border-surface-800 rounded-lg pl-8 pr-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                placeholder="0.00" />
            </div>
          </div>

          <button type="submit" disabled={loading || !amount}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <ArrowDownLeft size={16} />
            {loading ? 'Processing...' : 'Submit Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
}
