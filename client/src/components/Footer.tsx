export function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`bg-gray-200 border-t border-black py-8 px-8 w-full ${className}`}>
      <div className="mx-20 flex justify-between items-start gap-12">
        {/* Left: branding + description */}
        <div className="max-w-95">
          <span className="text-2xl font-black tracking-tighter text-blue-900 block mb-6">
            Physical Chemistry - <div>CM-UY 3113</div>
          </span>
          <p className="text-on-surface-variant text-sm leading-relaxed opacity-70">
            A collection of physical chemistry resources maintained by William Wei for students in CM-UY 3113: Physical
            Chemistry at NYU Tandon's Department of Chemical and Biomolecular Engineering.
          </p>
        </div>
        <div className="flex gap-16">
          <div>
            <h5 className="font-bold uppercase text-primary mb-4">Contact</h5>
            <div className="mb-2">For questions and inquires or to report issues, please contact:</div>
            <div> William Wei</div>
            <a href="mailto:williamwei9857@gmail.com">williamwei9857@gmail.com</a>
            <div className="flex mt-12 gap-5">
              <a href="privacy-policy" className="font-bold uppercase underline underline-offset-4 text-primary">
                Privacy Policy
              </a>
              <a href="cookies" className="font-bold uppercase underline underline-offset-4  text-primary">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
