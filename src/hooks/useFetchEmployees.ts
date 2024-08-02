import { useState, useEffect } from 'react';
import { CartData, getVehicleById } from '../services/vehicleService';
import { EmployeeData, getEmployees } from '../services/employeeService';

const useFetchEmployees = (token: string) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const employeesData = await getEmployees(token);
      console.log(employeesData);
      setEmployees(employeesData);
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

  return { employees, loading, error, refetch };
};

export default useFetchEmployees;
