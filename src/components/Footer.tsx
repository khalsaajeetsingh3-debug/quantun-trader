export default function Footer() {
  return (
    <footer className="border-t border-surface-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="font-display font-bold text-white text-sm">Q</span>
              </div>
              <span className="font-display font-semibold text-lg text-white">QuantumTrade</span>
            </div>
            <p className="text-surface-200/60 text-sm leading-relaxed">
              AI-powered automated trading for the modern investor.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Performance', 'Integrations'].map((l) => (
                <li key={l}><a href="#" className="text-surface-200/60 hover:text-primary-400 text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((l) => (
                <li key={l}><a href="#" className="text-surface-200/60 hover:text-primary-400 text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Risk Disclosure', 'Licenses'].map((l) => (
                <li key={l}><a href="#" className="text-surface-200/60 hover:text-primary-400 text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-surface-200/40 text-xs">
            &copy; {new Date().getFullYear()} QuantumTrade AI. All rights reserved.
          </p>
          <p className="text-surface-200/40 text-xs max-w-md text-center sm:text-right">
            Trading involves risk. Past performance does not guarantee future results. Only invest what you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
}
