import React, { useState } from 'react';

const ExpandablePanel = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4">
            <button onClick={togglePanel} className="w-full text-left bg-gray-800 text-white p-3 rounded-lg">
                {title}
            </button>
            {isOpen && (
                <div className="bg-gray-700 text-white p-3 rounded-lg mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ExpandablePanel; 