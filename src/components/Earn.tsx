import { TrendingUp, Users, Award } from 'lucide-react';

const methods = [
  {
    icon: TrendingUp,
    title: 'Bot Trading Profit',
    desc: 'Earn passively from automated bot performance. Your capital works 24/7 with AI-driven strategies.',
    gradient: 'from-emerald-500 to-emerald-700',
    stat: '8-25%',
    statLabel: 'Monthly Target',
  },
  {
    icon: Users,
    title: 'Referral Bonus',
    desc: 'Earn the moment your referral invests. Instant commissions deposited to your account.',
    gradient: 'from-primary-500 to-primary-700',
    stat: '5-10%',
    statLabel: 'Per Referral',
  },
  {
    icon: Award,
    title: 'Partner Income',
    desc: 'Build a team — get rewarded for their growth. Multi-level partner rewards with unlimited depth.',
    gradient: 'from-accent-500 to-accent-600',
    stat: '3-7%',
    statLabel: 'Team Override',
  },
];

export default function Earn() {
  return (
    <section id="earn" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">Multiple Income Streams</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Three Ways to Earn
          </h2>
          <p className="text-surface-200 text-lg max-w-xl mx-auto">
            Stack multiple income streams from a single platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {methods.map((m) => (
            <div key={m.title} className="glass-card rounded-2xl p-6 sm:p-8 group hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <m.icon size={26} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{m.title}</h3>
              <p className="text-surface-200 text-sm leading-relaxed mb-6">{m.desc}</p>
              <div className="bg-surface-900/60 rounded-xl px-4 py-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-white">{m.stat}</span>
                <span className="text-surface-200/70 text-xs">{m.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
