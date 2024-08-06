import AsyncStorage from "@react-native-async-storage/async-storage";

export interface EmployeeData {
    id: number;
    name: string;
    email: string;
    password: string;
    type: number;
}

const apiUrl = 'http://192.168.1.124/api';

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

        return responseData.data.employees;
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

export async function createEmployee(
    token: string, 
    name: string, 
    email: string,
    password: string,
    type: number,
): Promise<EmployeeData> {
    try {
        const requestBody: any = {
            name: name,
            email: email,
            password: password,
            type: type,
        };

        const response = await fetch(`${apiUrl}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (createEmployee): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao criar funcionário');
        }

        return responseData.data.employee;
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

export async function updateEmployee(
    token: string, 
    id: number, 
    name: string, 
    email: string,
    type: number,
): Promise<EmployeeData> {
    try {
        const requestBody: any = {
            name: name,
            email: email,
            type: type,
        };

        const response = await fetch(`${apiUrl}/employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (updateEmployee): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao atualizar funcionário');
        }

        return responseData.data.employee;
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

export async function getEmployeeById(token: string, id: number): Promise<EmployeeData> {
    try {
        const response = await fetch(`${apiUrl}/employee/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (getEmployeeById): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao obter funcionário');
        }

        return responseData.data.employee;
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

export async function deleteById(token: string, id: number): Promise<EmployeeData> {
    try {
        const response = await fetch(`${apiUrl}/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição (deleteById): ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();

        if (!responseData.data.status) {
            throw new Error(responseData.data.errors[0].message || 'Erro ao deletar funcionário');
        }

        return responseData.data.employee;
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

export const employeeService = { getEmployees, createEmployee, updateEmployee,  getEmployeeById, deleteById };
