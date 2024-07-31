export interface EmployeeData {
    id: number;
    name: string;
    email: string;
    type: string;

}

const apiUrl = 'http://127.0.0.1:8000/api';

export async function getEmployees(token: string): Promise<EmployeeData[]> {
    try {
        const response = await fetch(`${apiUrl}/employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (getEmployees): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao obter funcionários');
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

export const employeeService = { getEmployees };
