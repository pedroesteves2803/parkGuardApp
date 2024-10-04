export interface PaymentData {
    id: number;
    value: number;
    value_in_reais: string;
    dateTime: string;
    paymentMethod: string;
    paid: boolean;
    vehicle_id: number;
}

const apiUrl = 'https://parkguardapi.fly.dev/api';

export async function createPayment(token: string, vehicleId: number, paymentMethod: string): Promise<PaymentData> {
    try {
        const response = await fetch(`${apiUrl}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                vehicleId: vehicleId,
                paymentMethod: paymentMethod,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (createPayment): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao criar pagamento');
        }

        return responseData.data.payment;
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

export async function finalizePayment(token: string, paymentID: number): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/payment/${paymentID}/finalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (finalizePayment): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao finalizar pagamento');
        }

        return responseData.data.payment;
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

export const paymentService = { createPayment, finalizePayment };
