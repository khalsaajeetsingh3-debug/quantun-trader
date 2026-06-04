import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$10',
    period: '/month',
    target: '8-12%',
    features: ['AI Bot Access', 'Basic Dashboard', 'Email Alerts', 'Community Support'],
    cta: 'Start Now',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$50',
    period: '/month',
    target: '12-18%',
    features: ['Everything in Starter', 'Advanced Analytics', 'Priority Signals', 'Dedicated Support', 'Referral Program'],
    cta: 'Get Growth',
    popular: true,
  },
  {
    name: 'Pro',
    price: '$200',
    period: '/month',
    target: '18-25%',
    features: ['Everything in Growth', 'Custom Strategies', 'VIP Signals', '1-on-1 Coaching', 'Partner Income', 'API Access'],
    cta: 'Go Pro',
    popular: false,
  },
];

export default function Plans() {
  return (
    <section id="plans" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-primary-950/10 to-surface-950 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-3">Investment Plans</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Flexible Entry Tiers
          </h2>
          <p className="text-surface-200 text-lg max-w-xl mx-auto">
            Same targeted returns, no hidden fees. Choose the plan that fits your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'border-primary-500/40 ring-1 ring-primary-500/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold text-white mb-1">{plan.name} Plan</h3>
                <p className="text-surface-200 text-sm">Target: {plan.target} monthly</p>
              </div>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-surface-200 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-surface-200">
                    <Check size={16} className="text-primary-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'bg-primary-600 hover:bg-primary-500 text-white hover:shadow-lg hover:shadow-primary-600/20' : 'border border-primary-700/40 hover:bg-primary-900/20 text-primary-300 hover:text-white'}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
