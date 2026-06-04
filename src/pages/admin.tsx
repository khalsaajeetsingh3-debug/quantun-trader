import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Users, ArrowDownLeft, ArrowUpRight, Check, X, DollarSign, RefreshCw } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  balance: number;
  plan: string;
  created_at: string;
}

interface Deposit {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  profiles: { email: string; full_name: string } | null;
}

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  wallet_address: string;
  status: string;
  created_at: string;
  profiles: { email: string; full_name: string } | null;
}

type Tab = 'deposits' | 'withdrawals' | 'users';

export function AdminPanel() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('deposits');
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [fetching, setFetching] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Profit modal state
  const [profitUserId, setProfitUserId] = useState<string | null>(null);
  const [profitAmount, setProfitAmount] = useState('');
  const [profitDesc, setProfitDesc] = useState('Trading profit');

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) navigate('/dashboard');
  }, [user, profile, loading, navigate]);

  const fetchData = async () => {
    setFetching(true);
    const [depRes, withRes, usrRes] = await Promise.all([
      supabase.from('deposits').select('id, user_id, amount, status, created_at, profiles!deposits_user_id_fkey(email, full_name)').order('created_at', { ascending: false }),
      supabase.from('withdrawals').select('id, user_id, amount, wallet_address, status, created_at, profiles!withdrawals_user_id_fkey(email, full_name)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    ]);
    setDeposits((depRes.data as unknown as Deposit[]) || []);
    setWithdrawals((withRes.data as unknown as Withdrawal[]) || []);
    setUsers((usrRes.data as Profile[]) || []);
    setFetching(false);
  };

  useEffect(() => {
    if (user && profile?.role === 'admin') fetchData();
  }, [user, profile]);

  const approveDeposit = async (id: string, userId: string, amount: number) => {
    setActionLoading(id);
    await supabase.from('deposits').update({ status: 'approved' }).eq('id', id);
    const { data: prof } = await supabase.from('profiles').select('balance').eq('id', userId).maybeSingle();
    const newBalance = (Number(prof?.balance) || 0) + amount;
    await supabase.from('profiles').update({ balance: newBalance }).eq('id', userId);
    await supabase.from('transactions').insert({ user_id: userId, type: 'deposit', amount, status: 'completed', description: 'Deposit approved' });
    fetchData();
    setActionLoading(null);
  };

  const rejectDeposit = async (id: string) => {
    setActionLoading(id);
    await supabase.from('deposits').update({ status: 'rejected' }).eq('id', id);
    fetchData();
    setActionLoading(null);
  };

  const approveWithdrawal = async (id: string, userId: string, amount: number) => {
    setActionLoading(id);
    await supabase.from('withdrawals').update({ status: 'approved' }).eq('id', id);
    const { data: prof } = await supabase.from('profiles').select('balance').eq('id', userId).maybeSingle();
    const newBalance = Math.max(0, (Number(prof?.balance) || 0) - amount);
    await supabase.from('profiles').update({ balance: newBalance }).eq('id', userId);
    await supabase.from('transactions').insert({ user_id: userId, type: 'withdrawal', amount, status: 'completed', description: 'Withdrawal approved' });
    fetchData();
    setActionLoading(null);
  };

  const rejectWithdrawal = async (id: string) => {
    setActionLoading(id);
    await supabase.from('withdrawals').update({ status: 'rejected' }).eq('id', id);
    fetchData();
    setActionLoading(null);
  };

  const handleAddProfit = async () => {
    if (!profitUserId || !profitAmount) return;
    setActionLoading('profit');
    const num = parseFloat(profitAmount);
    if (num <= 0) { setActionLoading(null); return; }

    const { data: prof } = await supabase.from('profiles').select('balance').eq('id', profitUserId).maybeSingle();
    const newBalance = (Number(prof?.balance) || 0) + num;
    await supabase.from('profiles').update({ balance: newBalance }).eq('id', profitUserId);
    await supabase.from('transactions').insert({ user_id: profitUserId, type: 'profit', amount: num, status: 'completed', description: profitDesc });
    setProfitUserId(null);
    setProfitAmount('');
    setProfitDesc('Trading profit');
    fetchData();
    setActionLoading(null);
  };

  if (loading || !profile || profile.role !== 'admin') return <div className="min-h-screen flex items-center justify-center"><div className="text-surface-200/60">Loading...</div></div>;

  const pendingDeps = deposits.filter((d) => d.status === 'pending');
  const pendingWiths = withdrawals.filter((w) => w.status === 'pending');

  return (
    <div className="min-h-screen bg-surface-950">
      <header className="border-b border-surface-800/50 bg-surface-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-accent-400" />
            <span className="font-display font-semibold text-white">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="text-surface-200/40 hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
            <Link to="/dashboard" className="text-sm text-surface-200/60 hover:text-white transition-colors">Back to Dashboard</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-1.5 mb-2"><Users size={14} className="text-primary-400" /><span className="text-xs text-surface-200/50">Total Users</span></div>
            <p className="font-display text-2xl font-bold text-white">{users.length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-1.5 mb-2"><ArrowDownLeft size={14} className="text-emerald-400" /><span className="text-xs text-surface-200/50">Pending Deposits</span></div>
            <p className="font-display text-2xl font-bold text-accent-400">{pendingDeps.length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-1.5 mb-2"><ArrowUpRight size={14} className="text-sky-400" /><span className="text-xs text-surface-200/50">Pending Withdrawals</span></div>
            <p className="font-display text-2xl font-bold text-sky-400">{pendingWiths.length}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-6 border-b border-surface-800/50">
          {(['deposits', 'withdrawals', 'users'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${tab === t ? 'border-primary-500 text-primary-400' : 'border-transparent text-surface-200/50 hover:text-white'}`}>
              {t === 'deposits' ? `Deposits${pendingDeps.length ? ` (${pendingDeps.length})` : ''}` :
               t === 'withdrawals' ? `Withdrawals${pendingWiths.length ? ` (${pendingWiths.length})` : ''}` : 'Users'}
            </button>
          ))}
        </div>

        {fetching ? (
          <div className="text-center py-12 text-surface-200/40">Loading...</div>
        ) : (
          <>
            {tab === 'deposits' && (
              <div className="space-y-3">
                {deposits.length === 0 ? <p className="text-center py-12 text-surface-200/40 text-sm">No deposits</p> : deposits.map((d) => (
                  <div key={d.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-white">{d.profiles?.email || 'Unknown'}</p>
                      <p className="text-xs text-surface-200/40">${Number(d.amount).toFixed(2)} — {new Date(d.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${d.status === 'pending' ? 'bg-accent-500/10 text-accent-400' : d.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{d.status}</span>
                      {d.status === 'pending' && (
                        <div className="flex gap-1.5">
                          <button disabled={actionLoading === d.id} onClick={() => approveDeposit(d.id, d.user_id, Number(d.amount))}
                            className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg text-emerald-400 transition-colors disabled:opacity-50"><Check size={14} /></button>
                          <button disabled={actionLoading === d.id} onClick={() => rejectDeposit(d.id)}
                            className="p-1.5 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition-colors disabled:opacity-50"><X size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'withdrawals' && (
              <div className="space-y-3">
                {withdrawals.length === 0 ? <p className="text-center py-12 text-surface-200/40 text-sm">No withdrawals</p> : withdrawals.map((w) => (
                  <div key={w.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-white">{w.profiles?.email || 'Unknown'}</p>
                      <p className="text-xs text-surface-200/40">${Number(w.amount).toFixed(2)} to {w.wallet_address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${w.status === 'pending' ? 'bg-accent-500/10 text-accent-400' : w.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{w.status}</span>
                      {w.status === 'pending' && (
                        <div className="flex gap-1.5">
                          <button disabled={actionLoading === w.id} onClick={() => approveWithdrawal(w.id, w.user_id, Number(w.amount))}
                            className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 rounded-lg text-emerald-400 transition-colors disabled:opacity-50"><Check size={14} /></button>
                          <button disabled={actionLoading === w.id} onClick={() => rejectWithdrawal(w.id)}
                            className="p-1.5 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition-colors disabled:opacity-50"><X size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'users' && (
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white">{u.email}</p>
                        {u.role === 'admin' && <span className="text-[10px] bg-accent-500/10 text-accent-400 px-2 py-0.5 rounded-full">Admin</span>}
                      </div>
                      <p className="text-xs text-surface-200/40">{u.full_name || 'No name'} — Balance: ${Number(u.balance).toFixed(2)} — Plan: {u.plan || 'Free'}</p>
                    </div>
                    <button onClick={() => setProfitUserId(u.id)}
                      className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors shrink-0">
                      <DollarSign size={12} /> Add Profit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {profitUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-display text-lg font-semibold text-white mb-4">Add Profit</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/40 text-sm">$</span>
                  <input type="number" min="0.01" step="0.01" value={profitAmount} onChange={(e) => setProfitAmount(e.target.value)}
                    className="w-full bg-surface-900/60 border border-surface-800 rounded-lg pl-8 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
                    placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Description</label>
                <input type="text" value={profitDesc} onChange={(e) => setProfitDesc(e.target.value)}
                  className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500/50 transition-colors" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setProfitUserId(null)} className="flex-1 border border-surface-800 text-surface-200 py-2 rounded-lg text-sm hover:border-primary-700/50 transition-colors">Cancel</button>
                <button onClick={handleAddProfit} disabled={!profitAmount || actionLoading === 'profit'}
                  className="flex-1 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                  {actionLoading === 'profit' ? 'Adding...' : 'Add Profit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
