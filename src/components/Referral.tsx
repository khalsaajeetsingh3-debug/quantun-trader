import { UserPlus, ArrowDownRight, Layers, Repeat } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Invite Traders', desc: 'Share your unique referral link with friends and network.' },
  { icon: ArrowDownRight, title: 'They Invest', desc: 'Your referrals sign up and start their trading journey.' },
  { icon: Layers, title: 'You Earn Instantly', desc: 'Receive immediate commission on their first investment.' },
  { icon: Repeat, title: 'Grow Your Team', desc: 'Build deeper partnerships for recurring multi-level rewards.' },
];

export default function Referral() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/30 via-surface-950 to-accent-950/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-3">Partner / Referral System</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Build Your Team. <span className="gradient-text">Earn Passively.</span>
            </h2>
            <p className="text-surface-200 text-lg leading-relaxed mb-8">
              Generate passive income with unlimited referrals and real-time payouts. The more your network grows, the more you earn.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4">
                <p className="font-display text-3xl font-bold text-primary-400">5-10%</p>
                <p className="text-surface-200 text-sm mt-1">Direct Referral Bonus</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="font-display text-3xl font-bold text-accent-400">Unlimited</p>
                <p className="text-surface-200 text-sm mt-1">Referral Depth</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="font-display text-3xl font-bold text-emerald-400">Instant</p>
                <p className="text-surface-200 text-sm mt-1">Payout Processing</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="font-display text-3xl font-bold text-sky-400">24/7</p>
                <p className="text-surface-200 text-sm mt-1">Earning Potential</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4 glass-card rounded-xl p-5 hover:border-primary-500/30 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary-900/50 border border-primary-800/40 flex items-center justify-center shrink-0 group-hover:bg-primary-800/50 transition-colors">
                  <s.icon size={18} className="text-primary-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-primary-500">0{i + 1}</span>
                    <h3 className="font-display font-semibold text-white text-sm">{s.title}</h3>
                  </div>
                  <p className="text-surface-200/80 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
