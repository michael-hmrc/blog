import React, { useState } from 'react';

interface AccordionProps {
    key: number
    title: string,
    content: string
}


const Accordion: React.FC<AccordionProps> = ({ key, title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full text-left py-3 focus:outline-none flex justify-between items-center"
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls="accordion-content"
            >
                <span className="text-lg font-semibold">{title}</span>
                <span>{isOpen ? '-' : '+'}</span>
            </button>
            <div
                id="accordion-content"
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                {isOpen && (
                    <div className="px-4 py-2 text-gray-700">
                        {content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accordion;
