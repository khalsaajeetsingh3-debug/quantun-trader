import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate('/dashboard'); return null; }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-2">
          <LogIn size={24} className="text-primary-400" />
          <h1 className="font-display text-2xl font-bold text-white">Sign In</h1>
        </div>
        <p className="text-surface-200/60 text-sm text-center mb-8">Welcome back to QuantumTrade AI</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Password</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors pr-10"
                placeholder="Your password" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-200/40 hover:text-surface-200">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-surface-200/50 text-sm text-center mt-6">
          Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [refCode, setRefCode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate('/dashboard'); return null; }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, referral_code: refCode || undefined },
      },
    });
    if (error) setError(error.message);
    else navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-2">
          <UserPlus size={24} className="text-primary-400" />
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
        </div>
        <p className="text-surface-200/60 text-sm text-center mb-8">Start your automated trading journey</p>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Full Name</label>
            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
              placeholder="John Doe" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Password</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} minLength={6}
                className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors pr-10"
                placeholder="Min 6 characters" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-200/40 hover:text-surface-200">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-surface-200/80 mb-1.5 block">Referral Code (optional)</label>
            <input type="text" value={refCode} onChange={(e) => setRefCode(e.target.value.toUpperCase())}
              className="w-full bg-surface-900/60 border border-surface-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-surface-200/30 focus:outline-none focus:border-primary-500/50 transition-colors uppercase"
              placeholder="ABC12345" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-surface-200/50 text-sm text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
