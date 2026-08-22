import React, { useState } from "react";

interface FilterDropdownMultiselectProps {
    label: string;
    values: string[];
    options: { value: string; label: string }[];
    allLabel: string;
    onChange: (values: string[]) => void;
}

const FilterDropdownMultiselect: React.FC<
    FilterDropdownMultiselectProps
> = ({
    label,
    values,
    options,
    allLabel,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedLabels = values
        .map(
            (value) =>
                options.find(
                    (option) => option.value === value
                )?.label
        )
        .filter(Boolean);

    const handleOptionClick = (value: string) => {
        if (values.includes(value)) {
            onChange(
                values.filter((current) => current !== value)
            );
        } else {
            onChange([...values, value]);
        }
    };

    const handleAllClick = () => {
        onChange([]);
        setIsOpen(false);
    };

    return (
        <div className="platform-filter">
            <span>{label}</span>

            <div className="platform-dropdown">
                <button
                    type="button"
                    className={`platform-dropdown-toggle ${
                        values.length > 0 ? "has-selection" : ""
                    }`}
                    onClick={() =>
                        setIsOpen((prev) => !prev)
                    }
                >
                    <span>
                        {values.length === 0
                            ? allLabel
                            : selectedLabels.join(", ")}
                    </span>

                    <span
                        className={`platform-dropdown-arrow ${
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
                    <div className="platform-dropdown-menu">
                        <button
                            type="button"
                            className={`platform-option ${
                                values.length === 0
                                    ? "active"
                                    : ""
                            }`}
                            onClick={handleAllClick}
                        >
                            <span>{allLabel}</span>
                        </button>

                        {options
                            .filter(
                                (option) => option.value !== ""
                            )
                            .map((option) => {
                                const selected =
                                    values.includes(option.value);

                                return (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`platform-option ${
                                            selected
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleOptionClick(
                                                option.value
                                            )
                                        }
                                    >
                                        <span>
                                            {option.label}
                                        </span>

                                        <span
                                            className={`platform-checkbox ${
                                                selected
                                                    ? "checked"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                );
                            })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterDropdownMultiselect;