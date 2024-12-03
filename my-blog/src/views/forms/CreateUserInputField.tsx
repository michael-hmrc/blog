import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import InputSanitizer from "../../utils/InputSanitizer";

// Reusable input field component with validation feedback
interface CreateUserInputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (sanitizedValue: string) => void; // Expect a sanitized value in the onChange handler
    validationMessage?: string;
    isValid?: boolean;
}

export const CreateUserInputField: React.FC<CreateUserInputFieldProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    validationMessage,
    isValid
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = InputSanitizer.sanitizeInput(e.target.value); // Sanitize the input
        onChange(sanitizedValue); // Pass sanitized value to the parent component
    };
    return (
        (
            <div className="mb-6 relative">
                <label htmlFor={id} className="text-lg block text-gray-800 mb-1">{label}:</label>
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200
                ${!value ? 'border-blue-500' : ''}  // Apply blue border when field is empty
                ${isValid === false && value ? 'border-red-500 focus:ring-red-300' : ''}
                ${isValid === true ? 'border-green-500 focus:ring-green-300' : ''}
            `}
                />
                {value && validationMessage && (
                    <div className="text-sm mt-1 flex items-center space-x-2">
                        {isValid ? (
                            <FaCheckCircle className="text-green-500" />
                        ) : (
                            <FaTimesCircle className="text-red-500" />
                        )}
                        <span className={isValid ? 'text-green-500' : 'text-red-500'}>
                            {validationMessage}
                        </span>
                    </div>
                )}
            </div>
        )
    )
}