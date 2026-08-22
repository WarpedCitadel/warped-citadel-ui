import React, { useState } from "react";

interface FilterDropdownProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    label,
    value,
    options,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    return (
        <div className="filter-dropdown-field">
            <span>{label}</span>

            <div className="filter-dropdown">
                <button
                    type="button"
                    className="filter-dropdown-toggle"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span>
                        {selectedOption?.label}
                    </span>

                    <span
                        className={`filter-dropdown-arrow ${
                            isOpen ? "open" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </button>

                {isOpen && (
                    <div className="filter-dropdown-menu">
                        {options.map((option) => (
                            <button
                                type="button"
                                key={option.value}
                                className={`filter-option ${
                                    option.value === value
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;