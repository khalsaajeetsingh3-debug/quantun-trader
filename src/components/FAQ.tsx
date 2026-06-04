import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does the AI trading bot work?',
    a: 'Our AI bot uses advanced machine learning algorithms to analyze market patterns, sentiment, and technical indicators in real-time. It automatically executes trades on your MetaTrader 5 account based on high-probability signals, removing emotional decision-making from the equation.',
  },
  {
    q: 'What is the minimum investment?',
    a: 'You can start with as little as $10 with our Starter Plan. This low entry point makes institutional-grade trading accessible to everyone, regardless of experience level or capital size.',
  },
  {
    q: 'How are returns calculated?',
    a: 'Returns are calculated based on the actual performance of the AI trading strategies applied to your account. Target returns range from 8-25% monthly depending on your plan tier. Past performance does not guarantee future results.',
  },
  {
    q: 'How do withdrawals work?',
    a: 'Withdrawals can be requested anytime through your dashboard. Processing typically takes 1-3 business days. There are no lock-up periods — you maintain full access to your capital at all times.',
  },
  {
    q: 'Is my capital safe?',
    a: 'Your funds remain in your own MetaTrader 5 account at all times. We never take custody of your capital. The bot only has trading permissions — it cannot withdraw your funds. All connections are secured with 256-bit SSL encryption.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-surface-200 text-lg">
            Everything you need to know before starting.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-display font-semibold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-primary-400 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-surface-200/80 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
