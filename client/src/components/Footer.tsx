export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-gray-200 border-t border-black py-8 px-8 w-full ${className}`}>
      <div className="mx-20 flex justify-between items-start gap-12">
        {/* Left: branding + description */}
        <div className="max-w-90">
          <span className="text-2xl font-black tracking-tighter text-blue-900 block mb-6">
            Physical Chemistry - <div>CM-UY 3113</div>
          </span>
          <p className="text-on-surface-variant text-sm leading-relaxed opacity-70">
            A collection of physical chemistry resources maintained by William Wei and the NYU Tandon's Department of
            Chemical and Biomolecular Engineering.
          </p>
        </div>
        <div className="flex gap-16">
          <div>
            <h5 className="text-xs w-max-xs font-bold uppercase tracking-widest text-primary mb-4">Contact</h5>
            <div className="mb-2">For questions and inquires or to report issues, please contact:</div>
            <div> William Wei</div>
            <div>williamwei9857@gmail.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
