import { Platform } from 'react-native';

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

export async function createVehicle(token: string, licensePlate: string): Promise<CartData[]> {
    const apiUrl = 'http://192.168.1.124/api/vehicle';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                licensePlate: licensePlate,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.message || 'Erro ao cadatrar veiculo!');
        }

        return responseData.data.vehicle;
    } catch (error) {
        console.error('Erro ao cadatrar veículo:', error.message);
        throw new Error(error.message);
    }
}

export async function detectPlace(imageUri: string) {
    const apiUrl = 'http://192.168.1.124:8282/detect';

    try {
        const formData = new FormData();

        const type = Platform.OS === 'ios' ? 'image/jpeg' : 'image/png';

        formData.append('image', {
            uri: imageUri,
            type: type,
            name: 'image.jpg', 
        } as any);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.YtyYz4Eq2fExO42JxMrYwXm3nH5VLh1B9dcL6E7U5TM",
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        return responseData.placa;
    } catch (error) {
        console.error('Erro ao detectar placa:', error.message);
        throw new Error(error.message);
    }
}


