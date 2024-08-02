import { useState, useEffect } from 'react';
import { EmployeeData, getEmployeeById } from '../services/employeeService';

const useFetchEmployeeById = (token: string, id: number) => {
  const [employee, setEmployee] = useState<EmployeeData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const EmployeeData = await getEmployeeById(token, id);
      setEmployee(EmployeeData);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { employee, loading, error, refetch };
};

export default useFetchEmployeeById;
