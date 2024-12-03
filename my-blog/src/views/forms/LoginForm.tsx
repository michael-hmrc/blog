import React, { useState } from 'react';
import LoginConnector from '../../connectors/LoginConnector';
import InputSanitizer from '../../utils/InputSanitizer';
import { InputField } from './InputField';


const LoginForm: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const inputSanitizer = InputSanitizer;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Validate fields
        if (!username || !password) {
            setErrorMessage('Please fill in both fields.');
            setLoading(false);
            return;
        }

        try {
            const response =
                await LoginConnector.login({
                    username,
                    password,
                });

            if (response.error) {
                setErrorMessage(`Invalid login credentials. Error: ${response.error}`);
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <form onSubmit={handleLogin}>

                    <InputField
                        id="username"
                        type="text"
                        value={username}
                        placeholder="Enter your username"
                        onChange={
                            (sanitizedValue: string) => { setUsername(sanitizedValue) }  // Update the state with sanitized value // Pass the handler that manages state
                        }
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200'
                    />

                    <InputField
                        id="password"
                        type={showPassword ? "text" : "password"}  // Toggle type based on state
                        value={password}
                        placeholder="Enter your password"
                        onChange={
                            (sanitizedValue: string) => { setPassword(sanitizedValue) }
                        }
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200'
                    />
                    {/* Center the button */}
                    <div className='flex justify-center pt-6 pb-6'>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Create one here
                        </a>
                    </p>

                    <p className="mt-2 text-gray-600">
                        Forgot your password?{' '}
                        <a href="/forgot/password" className="text-blue-500 hover:underline">
                            Reset it here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
