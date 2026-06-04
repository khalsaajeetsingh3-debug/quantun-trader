import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-primary-950/20 to-surface-950 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Start Your <span className="gradient-text">$10 Investment</span> Journey Today
        </h2>
        <p className="text-surface-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of investors growing their portfolio with QuantumTrade AI. Fully automated, always on, working for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/25 flex items-center gap-2 text-lg">
            Start Investing Now <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
