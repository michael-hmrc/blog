import React, { useState } from 'react';
import InputSanitizer from '../../utils/InputSanitizer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


interface InputFieldProps {
    id: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (sanitizedValue: string) => void;
    className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ id, type, value, placeholder, onChange, className }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = InputSanitizer.sanitizeInput(e.target.value);
        onChange(sanitizedValue);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4 relative">
            <label className="block text-gray-700 mb-1" htmlFor={id}>
                {placeholder}
            </label>
            <div className="relative w-full">
                <input
                    id={id}
                    type={type === 'password' && showPassword ? 'text' : type}
                    value={value}
                    onChange={handleInputChange}
                    className={`${className} pr-10`} // Add padding to the right to make space for the button
                    placeholder={placeholder}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                    >
                        <FontAwesomeIcon className='pr-2' icon={showPassword ? faEyeSlash : faEye} />
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
        </div>
    );
};
