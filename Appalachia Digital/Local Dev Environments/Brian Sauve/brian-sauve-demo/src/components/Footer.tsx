export default function Footer() {
  return (
    <footer className="bg-cathedral text-parchment pt-16 pb-12 mt-auto relative overflow-hidden border-t-8 border-wood">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-wood/40 rounded-t-[50rem] blur-2xl opacity-50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        <h2 className="font-heading text-2xl tracking-widest mb-4 text-parchment">BRIAN SAUVÉ</h2>
        <p className="font-body text-sm text-parchment/60 mb-6 max-w-md text-center">
          For the New Christendom. Reformed pastor, psalm musician, author, and podcaster.
        </p>
        <div className="text-xs uppercase tracking-widest text-oak font-semibold">
          &copy; {new Date().getFullYear()} Brian Sauvé. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
