import { AuthData, tokenReset } from "../contexts/AuthContext";

const apiUrl = 'https://parkguardapi.fly.dev/api';

export async function signIn(email: string, password: string): Promise<AuthData> {
    try {
        const response = await fetch(`${apiUrl}/employee/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Credenciais inválidas!');
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            const errors = responseData.data.errors;
            let errorMessage = 'Erro ao fazer login';

            if (Array.isArray(errors)) {
                errorMessage = errors.map((error: any) => error.message).join(', ');
            } else if (errors.message) {
                errorMessage = errors.message;
            }

            throw new Error(errorMessage);
        }

        const { token, name, email: userEmail, type } = responseData.data.employee;

        return {
            token: token,
            email: userEmail,
            name: name,
            type: type,
        };

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Network request failed') {
            throw new Error("Algo deu errado, tente novamente mais tarde!");
        } else {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocorreu um erro desconhecido.');
            }
        }
    }
}

export async function signOut(code: string): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/employee/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: code
            }),
        });


        if (!response.ok) {
            throw new Error('Algo deu errado, tente novamente mais tarde!');
        }

        const responseData = await response.json();


        if (!responseData.data.status) {
            const errors = responseData.data.errors;
            let errorMessage = 'Erro ao fazer logout';

            if (Array.isArray(errors)) {
                errorMessage = errors.map((error: any) => error.message).join(', ');
            } else if (errors.message) {
                errorMessage = errors.message;
            }

            throw new Error(errorMessage);
        }

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Network request failed') {
            throw new Error("Algo deu errado, tente novamente mais tarde!");
        } else {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocorreu um erro desconhecido.');
            }
        }    
    }
}

export async function resetPassword(email: string): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/employee/password/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Erro ao resetar a senha';
            throw new Error(errorMessage);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            const errors = responseData.data.errors;
            let errorMessage = responseData.data.message || 'Erro ao resetar a senha';

            if (Array.isArray(errors)) {
                errorMessage = errors.map((error: any) => error.message).join(', ');
            } else if (errors.message) {
                errorMessage = errors.message;
            }

            throw new Error(errorMessage);
        }

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Network request failed') {
            throw new Error("Algo deu errado, tente novamente mais tarde!");
        } else {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocorreu um erro desconhecido.');
            }
        }    
    }
}

export async function verifyTokenResetPassword(code: string): Promise<tokenReset> {
    try {
        const response = await fetch(`${apiUrl}/employee/password/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Erro ao verificar token';
            throw new Error(errorMessage);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            const errors = responseData.data.errors;
            let errorMessage = responseData.data.message || 'Erro ao verificar token';

            if (Array.isArray(errors)) {
                errorMessage = errors.map((error: any) => error.message).join(', ');
            } else if (errors.message) {
                errorMessage = errors.message;
            }

            throw new Error(errorMessage);
        }

        const { token, email, expirationTime } = responseData.data.token;

        return {
            token: token,
            email: email,
            expirationTime: expirationTime,
        };

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Network request failed') {
            throw new Error("Algo deu errado, tente novamente mais tarde!");
        } else {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocorreu um erro desconhecido.');
            }
        }
    }
}

export async function resetPasswordUpdate(code: string, password: string): Promise<boolean> {
    try {
        const response = await fetch(`${apiUrl}/employee/password/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Erro ao alterar senha';
            throw new Error(errorMessage);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            const errors = responseData.data.errors;
            let errorMessage = responseData.data.message || 'Erro ao alterar senha';

            if (Array.isArray(errors)) {
                errorMessage = errors.map((error: any) => error.message).join(', ');
            } else if (errors.message) {
                errorMessage = errors.message;
            }

            throw new Error(errorMessage);
        }

        return true;
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Network request failed') {
            throw new Error("Algo deu errado, tente novamente mais tarde!");
        } else {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocorreu um erro desconhecido.');
            }
        }       
    }
}

export const authService = { signIn, signOut, resetPassword, verifyTokenResetPassword, resetPasswordUpdate };
