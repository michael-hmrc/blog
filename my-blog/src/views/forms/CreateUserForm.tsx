import debounce from 'lodash.debounce'; // Import debounce from lodash
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Icons for validation feedback
import CreateUserConnector from '../../connectors/CreateUserConnector';
import RoleProtected from '../../contexts/RoleProtected';
import { UserRoleProvider } from '../../contexts/UserRoleContext';
import UserTypes from '../../models/ADTs/UserType';
import { CreateUserFormData } from '../../models/UserData';
import { checkEmailExists, checkUsernameExists } from '../../service/LoginValidationService';
import IdGenerator from '../../utils/IdGenerator';
import { CreateUserInputField } from './CreateUserInputField';


const CreateUserForm: React.FC = () => {

    const idGenerator = IdGenerator;

    const [formData, setFormData] =
        useState(
            {
                user_id: '',
                userTypeState: 'viewer',
                username: '',
                password: '',
                email: '',
            }
        );

    const { username, password, email, userTypeState } = formData;

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false); // State for username check
    const [emailTaken, setEmailTaken] = useState(false); // State for email check

    // Input change handler for form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Debounced check for username availability
    const debouncedCheckUsername =
        useCallback(
            debounce(async (username: string) => {
                if (username) {
                    const exists = await checkUsernameExists(username);
                    setUsernameTaken(exists);
                }
            }, 500),
            []
        );

    // Debounced check for email availability
    const debouncedCheckEmail =
        useCallback(
            debounce(async (email: string) => {
                if (email) {
                    const exists = await checkEmailExists(email);
                    setEmailTaken(exists);
                }
            }, 500),
            []
        );

    // Trigger username validation with debouncing
    useEffect(() => {
        if (username) debouncedCheckUsername(username);
    }, [username, debouncedCheckUsername]);

    // Trigger email validation with debouncing
    useEffect(() => {
        if (email) debouncedCheckEmail(email);
    }, [email, debouncedCheckEmail]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (usernameTaken) {
            setErrorMessage('Username is already taken.');
            return;
        }

        if (emailTaken) {
            setErrorMessage('Email is already registered.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        const userToCreate: CreateUserFormData = {
            user_id: idGenerator.generateUserId(),
            user_type: userTypeState || 'viewer',
            username,
            password,
            email,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const { data } = await CreateUserConnector.postCreateUser(userToCreate);

            if (data) {
                alert('User created successfully');
                setFormData({
                    user_id: '',
                    userTypeState: 'viewer',
                    username: '',
                    password: '',
                    email: '',
                });
            } else {
                setErrorMessage('Error creating user. User was not created.');
            }
        } catch (err) {
            setErrorMessage('An error occurred while creating the user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserRoleProvider>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Create New User</h2>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <CreateUserInputField
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={
                        (sanitizedValue: string) => {
                            setFormData({ ...formData, username: sanitizedValue });
                        }
                    }
                    validationMessage={
                        usernameTaken && username ? 'Username is already taken.' : 'Username is available.'
                    }
                    isValid={!!username && !usernameTaken}
                />

                <CreateUserInputField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={
                        (sanitizedValue: string) => {
                            setFormData({ ...formData, email: sanitizedValue });
                        }
                    }
                    validationMessage={
                        emailTaken && email ? 'Email is already registered.' : 'Email is available.'
                    }
                    isValid={!!email && !emailTaken}
                />

                <CreateUserInputField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={
                        (sanitizedValue: string) => {
                            setFormData({ ...formData, password: sanitizedValue });
                        }
                    }
                />

                <RoleProtected roles={[UserTypes.Admin]}>
                    <div className="mb-6">
                        <label htmlFor="userTypeState" className="text-lg block text-gray-800">Role:</label>
                        <select
                            id="userTypeState"
                            value={userTypeState}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </RoleProtected>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center space-x-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Creating user...</span> {/* Message shown while loading */}
                            </>
                        ) : (
                            'Create User'
                        )}
                    </button>
                </div>
            </form>
        </UserRoleProvider>
    );
};


export default CreateUserForm;
