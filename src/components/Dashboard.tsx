import { TrendingUp, DollarSign, ChartBar as BarChart3, Clock } from 'lucide-react';

const stats = [
  { label: 'Total PnL', value: '+$12,847', change: '+24.7%', icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Win Rate', value: '89.3%', change: '+2.1%', icon: TrendingUp, color: 'text-primary-400' },
  { label: 'Active Trades', value: '14', change: '+3 today', icon: BarChart3, color: 'text-accent-400' },
  { label: 'Uptime', value: '99.97%', change: '30 days', icon: Clock, color: 'text-sky-400' },
];

function MiniChart() {
  const bars = [35, 50, 42, 65, 55, 78, 62, 85, 70, 92, 80, 95];
  return (
    <div className="flex items-end gap-1 h-20">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary-600 to-primary-400 opacity-80 hover:opacity-100 transition-opacity"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-3">Performance</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Consistent. Targeted. Automated.
          </h2>
          <p className="text-surface-200 text-lg max-w-xl mx-auto">
            Track real-time bot performance, daily PnL, and compounding growth — all from a unified dashboard.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="flex items-center gap-1.5 mb-2">
                  <s.icon size={14} className={s.color} />
                  <span className="text-xs text-surface-200/60">{s.label}</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                <p className={`text-xs mt-0.5 ${s.color}`}>{s.change}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-primary-900/20 pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-surface-200">Daily Performance</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <TrendingUp size={12} />
                <span>+2.4% today</span>
              </div>
            </div>
            <MiniChart />
            <div className="flex justify-between mt-2 text-[10px] text-surface-200/40">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
              <span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
              <span>Thu</span><span>Fri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
