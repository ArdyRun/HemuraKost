export default function Footer() {
  return (
    <footer className="bg-surface border-t border-primary/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-wider text-primary">HEMURA KOST</span>
          </div>
          <p className="text-primary/60 text-sm">
            &copy; {new Date().getFullYear()} Hemura Kost. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
