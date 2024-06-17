export interface CartData {
    id: number;
    manufacturer: string;
    color: string;
    model: string;
    licensePlate: string;
    entryTimes: string;
    departureTimes: string | null;
}

export async function getVehicles(token: string): Promise<CartData[]> {
    const apiUrl = 'http://192.168.1.124/api/vehicles';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.message || 'Erro ao obter dados');
        }

        return responseData.data.vehicles;
    } catch (error) {
        console.error('Erro ao buscar veículos:', error.message);
        throw new Error(error.message);
    }
}
