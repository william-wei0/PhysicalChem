import React, { type CSSProperties } from "react";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "./accordion-context";
import {
  AccordionItemProvider,
  AccordionProvider,
} from "./accordion-provider.tsx";

type WithChildren = { children: React.ReactNode };
type AccordionStyle = { className?: string; style?: CSSProperties };
type AccordionProps = WithChildren & { allowMultiple?: boolean };
type AccordionItemProps = WithChildren & { id: string | null };
type AccordionTriggerProps = WithChildren & AccordionStyle;
type AccordionContentProps = WithChildren & AccordionStyle;

export const Accordion = ({ children, allowMultiple = false }: AccordionProps) => {
    return <AccordionProvider allowMultiple={allowMultiple}>{children}</AccordionProvider>;
};

export const AccordionItem = ({ children, id }: AccordionItemProps) => {
  return (
    <>
      <AccordionItemProvider id={id}>{children}</AccordionItemProvider>
    </>
  );
};
export const AccordionTrigger = ({ className, style, children }: AccordionTriggerProps) => {
    const context = useAccordionContext();
    const item = useAccordionItemContext();

    if (!context || !item) return null;
    return (
        <div>
            <button
                className={`flex items-center justify-between w-full ${className}`}
                style={style}
                onClick={() => context.handleTrigger(item.id)}
            >
                <span className="flex-1">{children}</span>
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className={`ml-1 transition-transform duration-300 ${context.activeContent.includes(item.id ?? '') ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>
        </div>
    );
};

export const AccordionContent = ({ className, style, children }: AccordionContentProps) => {
    const context = useAccordionContext();
    const item = useAccordionItemContext();

    return context?.activeContent.includes(item?.id ?? '') ? (
        <div className={className} style={style}>
            {children}
        </div>
    ) : null;
};