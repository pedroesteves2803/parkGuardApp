export interface CartData {
    id: number;
    manufacturer: string;
    color: string;
    model: string;
    licensePlate: string;
    entryTimes: string;
    departureTimes: string | null;
}

const apiUrl = 'http://192.168.1.124/api';

export async function getVehicles(token: string): Promise<CartData[]> {
    try {
        const response = await fetch(`${apiUrl}/vehicles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (getVehicles): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao obter veiculos');
        }

        return responseData.data.vehicles;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createVehicle(token: string, licensePlate: string): Promise<CartData> {
    try {
        const response = await fetch(`${apiUrl}/vehicle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                licensePlate: licensePlate,
            }),
        });

        if (!response.ok) {
            console.log(licensePlate)
            throw new Error(`Erro na requisição (createVehicle): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao cadastrar veículo!');
        }

        return responseData.data.vehicle;
    } catch (error) {
        console.error('Erro ao cadastrar veículo:', error.message);
        throw new Error(error.message);
    }
}

export const vehicleService = { getVehicles, createVehicle };
