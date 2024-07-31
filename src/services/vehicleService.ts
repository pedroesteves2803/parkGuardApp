export interface CartData {
    id: number;
    manufacturer: string;
    color: string;
    model: string;
    licensePlate: string;
    entryTimes: string;
    departureTimes: string;
}

const apiUrl = 'http://127.0.0.1:8000/api';

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

export async function getVehicleById(token: string, id: number): Promise<CartData> {
    try {
        const response = await fetch(`${apiUrl}/vehicle/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (getVehicle): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao obter veiculo');
        }

        return responseData.data.vehicle;
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
            throw new Error(`Erro na requisição (createVehicle): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao cadastrar veículo!');
        }

        return responseData.data.vehicle;
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

export async function updateVehicle(
    token: string,
    id: number,
    manufacturer?: string,
    color?: string,
    model?: string,
    licensePlate?: string,
): Promise<CartData> {
    try {
        const requestBody: any = {
            manufacturer: manufacturer === '' ? null : manufacturer,
            color: color === '' ? null : color,
            model: model === '' ? null : model,
            licensePlate: licensePlate === '' ? null : licensePlate,
        };

        console.log(requestBody)

        const response = await fetch(`${apiUrl}/vehicle/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (updateVehicle): ${response.status} ${response.statusText}`);
        }
        

        const responseData = await response.json();


        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao atualizar veiculo!');
        }

        return responseData.data.vehicle;
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

export async function exitVehicle(
    token: string,
    licensePlate?: string,
): Promise<void> {
    try {

        const response = await fetch(`${apiUrl}/vehicle/exit`, {
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
            throw new Error(`Erro na requisição (exitVehicle): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao retirar veiculo!');
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

export const vehicleService = { getVehicles, getVehicleById, createVehicle, updateVehicle, exitVehicle };
