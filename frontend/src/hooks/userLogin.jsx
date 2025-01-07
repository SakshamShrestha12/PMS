import { useState } from 'react';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password, route) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Set token and user data in localStorage
            localStorage.setItem('token', data.token);
            console.log('token: ',data.token)
            localStorage.setItem('user', JSON.stringify(data.user));

            return data;  // Return data for further use
        } catch (error) {
            setError(error.message);
            console.error(error);
            throw new Error(error.message);  // Rethrow for handling in LoginPage
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
