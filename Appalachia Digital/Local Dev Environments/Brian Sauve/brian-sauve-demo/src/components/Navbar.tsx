import Link from 'next/link';

export default function Navbar() {
  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'MUSIC', href: '/music' },
    { label: 'LISTEN', href: '/listen' },
    { label: 'WORDS', href: '/words' },
    { label: 'ABOUT', href: '/about' },
  ];

  return (
    <nav className="bg-cathedral border-b-4 border-wood text-parchment sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading text-2xl tracking-widest text-[#F5F0E8] hover:text-amber transition-colors">
              BRIAN SAUVÉ
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center lg:space-x-8 lg:ml-10">
            <Link href="/proposal" className="font-heading text-lg tracking-[0.2em] text-amber hover:text-[#F5F0E8] transition-colors uppercase border-b border-amber pb-1 mr-4">
              Proposal
            </Link>
            
            <div className="flex items-center border-2 border-wood/40 rounded-full px-6 py-2.5 bg-ink/20 relative backdrop-blur-sm">
              <span className="absolute -top-3 left-6 bg-cathedral px-2 text-[10px] text-amber/80 tracking-[0.3em] uppercase font-bold">Website Demo</span>
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center text-xs tracking-[0.15em] text-[#F5F0E8]/80 hover:text-amber transition-colors font-body uppercase"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            {/* Simple mobile menu fallback */}
            <span className="text-sm font-body tracking-wider text-amber uppercase">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
