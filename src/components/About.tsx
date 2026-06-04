import { Brain, Link, ChartBar as BarChart3, Settings } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Automation', desc: 'Self-learning algorithms execute trades 24/7.', gradient: 'from-primary-500 to-primary-700' },
  { icon: Link, title: 'MT5 Integrated', desc: 'Native connection to MetaTrader 5.', gradient: 'from-accent-500 to-accent-600' },
  { icon: BarChart3, title: 'Real-time Analysis', desc: 'Live market sentiment & signal scoring.', gradient: 'from-emerald-500 to-emerald-700' },
  { icon: Settings, title: 'Fully Automated', desc: 'Set up once. Bot does the rest.', gradient: 'from-sky-500 to-sky-700' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-3">About QuantumTrade AI</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Institutional-Grade Trading
          </h2>
          <p className="text-surface-200 text-lg max-w-xl mx-auto">
            An institutional-grade trading engine — built for retail investors who want hands-off performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon size={22} className="text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-surface-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
