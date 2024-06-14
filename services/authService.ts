
import { AuthData } from "../contexts/AuthContext";

async function signIn(email: string, password: string): Promise<AuthData> {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if(password === '12345678'){
                resolve({
                    token: 'fake-token',
                    email,
                    name: 'Pedro'
                });
            }else {
                reject(new Error('Credenciais invalida'));
            }
        }, 500);
    });
}

export const authService = {signIn}