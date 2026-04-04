import { HashLink } from "react-router-hash-link";
import { CHAPTER_SECTIONS } from "./chapterSections";
import { useState } from "react";


export function HomepageChapterSections() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-lg font-bold tracking-[0.25em] uppercase text-outline mb-6">Chapters & Simulations</h2>

      <div className="space-y-10">
        {CHAPTER_SECTIONS.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={item.title}>
              <div className="group cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : i)}>
                <div className="flex justify-between items-baseline mb-2 ">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors underlineAnimationText">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-outline-variant italic">{item.date}</span>
                    <span
                      className={`text-outline-variant transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed max-w-4xl">{item.description}</p>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="border-l-2 border-outline-variant/30 pl-2 space-y-1">
                  {item.units.map((unit) => (
                    <li key={unit.title}>
                      <HashLink
                        to={unit.href}
                        className="group/unit text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3 py-2 px-3 rounded-md hover:bg-primary/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 group-hover/unit:bg-primary group-hover/unit:scale-125 transition-all duration-200 inline-block shrink-0" />

                        <span className="relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover/unit:after:w-full">
                          {unit.title}
                        </span>

                        <span className="ml-auto opacity-0 group-hover/unit:opacity-100 transition-opacity duration-200 text-primary text-xs">
                          →
                        </span>
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}