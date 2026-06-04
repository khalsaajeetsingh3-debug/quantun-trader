import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Check } from 'lucide-react';

export function WithdrawPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!user || !profile) { navigate('/login'); return null; }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const num = parseFloat(amount);
    if (!num || num < 1) { setError('Minimum withdrawal is $1'); return; }
    if (num > Number(profile!.balance)) { setError('Insufficient balance'); return; }

    setLoading(true);
    const { error: insertErr } = await supabase.from('withdrawals').insert({
      user_id: user!.id,
      amount: num,
      wallet_address: wallet,
    });

    if (insertErr) {
      setError(insertErr.message);
    } else {
      setSuccess(true);
      setAmount('');
      setWallet('');
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
          <h2 className="font-display text-2xl font-bold text-white mb-2">Withdrawal Submitted</h2>
          <p className="text-surface-200/60 text-sm mb-6">Your withdrawal request is pending approval. Funds will be sent to your wallet once approved.</p>
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
          <ArrowUpRight size={22} className="text-sky-400" />
          <h1 className="font-display text-2xl font-bold text-white">Withdraw</h1>
        </div>
        <p className="text-surface-200/60 text-sm mb-2">Withdraw funds to your wallet</p>
        <p className="text-xs text-surface-200/40 mb-6">Available balance: <span className="text-emerald-400 font-semibold">${Number(profile!.balance).toFixed(2)}</span></p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>}

        <form onSubmit={handleWithdraw} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/40 text-sm">$</span>
              <input type="number" min="1" step="0.01" max={Number(profile!.balance)} required value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-surface-900/60 border border-surface-800 rounded-lg pl-8 pr-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Wallet Address</label>
            <input type="text" required value={wallet} onChange={(e) => setWallet(e.target.value)}
              className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
              placeholder="Enter your wallet address" />
          </div>

          <button type="submit" disabled={loading || !amount || !wallet}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <ArrowUpRight size={16} />
            {loading ? 'Processing...' : 'Submit Withdrawal'}
          </button>
        </form>
      </div>
    </div>
  );
}
