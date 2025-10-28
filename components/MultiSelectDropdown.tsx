import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon } from './icons';

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  label: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedOptions, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleOptionToggle = (option: string) => {
    let newSelectedOptions: string[];

    if (option === 'Todos') {
        newSelectedOptions = selectedOptions.includes('Todos') ? [] : ['Todos'];
    } else {
        if (selectedOptions.includes('Todos')) {
             newSelectedOptions = [option];
        } else {
             newSelectedOptions = selectedOptions.includes(option)
                ? selectedOptions.filter(item => item !== option)
                : [...selectedOptions, option];
        }
    }
    
    if (newSelectedOptions.length === 0) {
        newSelectedOptions = ['Todos'];
    }
    
    onChange(newSelectedOptions);
  };

  const getButtonText = () => {
    if (selectedOptions.includes('Todos') || selectedOptions.length === 0) {
      return `Todos os ${label}`;
    }
    if (selectedOptions.length === 1) {
      return selectedOptions[0];
    }
    return `${selectedOptions.length} ${label} selecionados`;
  };

  return (
    <div className="relative w-full md:w-56" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full appearance-none text-left bg-white pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="block truncate">{getButtonText()}</span>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
          <ul className="py-1">
            {options.map(option => (
              <li
                key={option}
                onClick={() => handleOptionToggle(option)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 flex items-center justify-between"
              >
                <span>{option}</span>
                {selectedOptions.includes(option) && <CheckIcon className="w-4 h-4 text-indigo-600" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;