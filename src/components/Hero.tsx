import { ArrowRight, TrendingUp, Zap, Shield } from 'lucide-react';

function TradingChart() {
  const points = [40, 55, 35, 65, 50, 80, 60, 90, 70, 95, 75, 100, 85, 110];
  const w = 600;
  const h = 200;
  const stepX = w / (points.length - 1);

  const pathData = points.map((p, i) => {
    const x = i * stepX;
    const y = h - (p / 120) * h;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaData = pathData + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3390ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3390ff" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={areaData} fill="url(#chartGrad)" />
      <path d={pathData} fill="none" stroke="#3390ff" strokeWidth="2.5" filter="url(#glow)" />
      {points.filter((_, i) => i === points.length - 1).map((p, i) => {
        const x = (points.length - 1) * stepX;
        const y = h - (p / 120) * h;
        return <circle key={i} cx={x} cy={y} r="5" fill="#3390ff" filter="url(#glow)" className="animate-pulse-glow" />;
      })}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/40 via-surface-950 to-surface-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary-900/30 border border-primary-700/30 rounded-full px-4 py-1.5 mb-8">
            <Zap size={14} className="text-accent-400" />
            <span className="text-xs font-medium text-primary-300">AI-Powered Trading Bot</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Start Your <span className="gradient-text">Automated Trading</span> Journey
        </h1>

        <p className="animate-fade-in-up-delay-2 text-surface-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Our AI-powered trading bot handles everything — market analysis, execution, and portfolio management — fully integrated with MetaTrader 5.
        </p>

        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#cta" className="bg-primary-600 hover:bg-primary-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/25 flex items-center gap-2">
            Start Investing <ArrowRight size={18} />
          </a>
          <a href="#about" className="border border-surface-800 hover:border-primary-700/50 text-surface-200 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-all">
            Learn More
          </a>
        </div>

        <div className="animate-fade-in-up-delay-3 max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8">
          <TradingChart />
          <div className="flex justify-between items-end mt-4 text-xs text-surface-200">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">+24.7%</span>
              <span className="text-surface-200/60">Monthly Growth</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Zap size={12} className="text-accent-400" />
                <span>Live Signals</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} className="text-primary-400" />
                <span>Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
