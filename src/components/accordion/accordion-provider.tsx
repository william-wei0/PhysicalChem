import { AccordionContext } from "./accordion-context";
import { AccordionItemContext } from "./accordion-context";
import { useState } from "react";

export const AccordionProvider = ({
    children,
} : {
    children: React.ReactNode,
}) => {
    const [activeContent, setActiveContent] = useState<string | null >(null);
    const handleTrigger = (id: string | null ) => {
        let activeId: string | null  = id;
        if( activeId === activeContent ) activeId = null
        setActiveContent(activeId);
    }
    const value = {
        activeContent,
        handleTrigger
    }
    return (
        <>
            <AccordionContext.Provider value={value}>
                { children }
            </AccordionContext.Provider>
        </>
    )
}


export const AccordionItemProvider = ({ 
    id,
    children 
}: {
    id: string | null;
    children: React.ReactNode
}) => {
    const value = {
        id
    }
    return (
        <>
            <AccordionItemContext.Provider value={value}>
                    { children }
            </AccordionItemContext.Provider>
        </>
    )
}
