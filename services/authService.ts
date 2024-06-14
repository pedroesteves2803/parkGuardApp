import { AuthData } from "../contexts/AuthContext";

async function signIn(email: string, password: string): Promise<AuthData> {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/employee/login', {
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
            throw new Error(responseData.data.message || 'Erro ao fazer login');
        }

        const { token, name, email: userEmail, tipo } = responseData.data.employee;

        return {
            token: token,
            email: userEmail,
            name: name,
            tipo: tipo,
        };

    } catch (error) {
        throw new Error(error.message);
    }
}

export const authService = { signIn };
