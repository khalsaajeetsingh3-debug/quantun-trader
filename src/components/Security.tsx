import { Shield, Globe, FileCheck } from 'lucide-react';

const items = [
  {
    icon: Shield,
    title: 'SSL 256-bit',
    desc: 'End-to-end encryption on every connection. Your data is secured with military-grade protection at all times.',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    icon: Globe,
    title: 'Global Compliance',
    desc: 'Operating under international standards. Full regulatory compliance across all trading jurisdictions.',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: FileCheck,
    title: 'Licensed',
    desc: 'Registered & licensed trading operations. Your capital is protected by established financial frameworks.',
    gradient: 'from-accent-500 to-accent-600',
  },
];

export default function Security() {
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-primary-950/10 to-surface-950 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">Trust & Security</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Your Capital, Protected
          </h2>
          <p className="text-surface-200 text-lg max-w-xl mx-auto">
            Bank-grade encryption and full regulatory compliance — your capital, protected.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <div key={item.title} className="glass-card rounded-2xl p-6 sm:p-8 text-center group hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-surface-200 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
