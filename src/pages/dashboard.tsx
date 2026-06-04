import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { DollarSign, ArrowDownLeft, ArrowUpRight, TrendingUp, Users, LogOut, LayoutDashboard, Wallet, Copy, Check } from 'lucide-react';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  description: string;
  created_at: string;
}

export function UserDashboard() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10).then(({ data }) => {
        setTransactions((data as Transaction[]) || []);
      });
      refreshProfile();
    }
  }, [user]);

  if (loading || !profile) return <div className="min-h-screen flex items-center justify-center"><div className="text-surface-200/60">Loading...</div></div>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(profile.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Balance', value: `$${Number(profile.balance).toFixed(2)}`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Plan', value: profile.plan || 'Free', icon: TrendingUp, color: 'text-primary-400' },
    { label: 'Deposits', value: `$${transactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((s, t) => s + Number(t.amount), 0).toFixed(2)}`, icon: ArrowDownLeft, color: 'text-accent-400' },
    { label: 'Withdrawals', value: `$${transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((s, t) => s + Number(t.amount), 0).toFixed(2)}`, icon: ArrowUpRight, color: 'text-sky-400' },
  ];

  return (
    <div className="min-h-screen bg-surface-950">
      <header className="border-b border-surface-800/50 bg-surface-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">Q</span>
            </div>
            <span className="font-display font-semibold text-white">QuantumTrade</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/dashboard" className="text-primary-400 text-sm font-medium flex items-center gap-1.5"><LayoutDashboard size={14} />Dashboard</Link>
            <Link to="/deposit" className="text-surface-200/60 hover:text-white text-sm transition-colors flex items-center gap-1.5"><ArrowDownLeft size={14} />Deposit</Link>
            <Link to="/withdraw" className="text-surface-200/60 hover:text-white text-sm transition-colors flex items-center gap-1.5"><ArrowUpRight size={14} />Withdraw</Link>
            {profile.role === 'admin' && <Link to="/admin" className="text-accent-400 hover:text-accent-300 text-sm font-medium flex items-center gap-1.5"><Users size={14} />Admin</Link>}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-xs text-surface-200/40 hidden sm:block">{profile.email}</span>
            <button onClick={handleLogout} className="text-surface-200/40 hover:text-red-400 transition-colors" title="Logout"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">Welcome, {profile.full_name || 'Trader'}</h1>
          <p className="text-surface-200/60 text-sm">Your trading dashboard at a glance</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <s.icon size={14} className={s.color} />
                <span className="text-xs text-surface-200/50">{s.label}</span>
              </div>
              <p className="font-display text-xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link to="/deposit" className="flex-1 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <Wallet size={16} /> Deposit Funds
          </Link>
          <Link to="/withdraw" className="flex-1 border border-surface-800 hover:border-primary-700/50 text-surface-200 hover:text-white font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            <ArrowUpRight size={16} /> Withdraw
          </Link>
        </div>

        <div className="glass-card rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-white text-sm">Your Referral Code</h2>
            <button onClick={copyReferral} className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="font-mono text-lg text-white tracking-wider">{profile.referral_code}</p>
          <p className="text-xs text-surface-200/40 mt-1">Share this code to earn referral bonuses</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h2 className="font-display font-semibold text-white text-sm mb-4">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-surface-200/40 text-sm py-4 text-center">No transactions yet. Make your first deposit to get started.</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-surface-800/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      t.type === 'deposit' ? 'bg-emerald-500/10' :
                      t.type === 'withdrawal' ? 'bg-red-500/10' :
                      t.type === 'profit' ? 'bg-accent-500/10' : 'bg-primary-500/10'
                    }`}>
                      {t.type === 'deposit' ? <ArrowDownLeft size={14} className="text-emerald-400" /> :
                       t.type === 'withdrawal' ? <ArrowUpRight size={14} className="text-red-400" /> :
                       <TrendingUp size={14} className="text-accent-400" />}
                    </div>
                    <div>
                      <p className="text-sm text-white capitalize">{t.type.replace('_', ' ')}</p>
                      <p className="text-xs text-surface-200/40">{new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      t.type === 'deposit' || t.type === 'profit' || t.type === 'referral_bonus' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {t.type === 'deposit' || t.type === 'profit' || t.type === 'referral_bonus' ? '+' : '-'}${Number(t.amount).toFixed(2)}
                    </p>
                    <p className={`text-xs ${t.status === 'completed' ? 'text-emerald-400/60' : t.status === 'pending' ? 'text-accent-400/60' : 'text-red-400/60'}`}>{t.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
