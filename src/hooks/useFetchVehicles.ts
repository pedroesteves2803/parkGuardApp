import { useState, useEffect } from 'react';
import { CartData, getVehicles } from '../services/vehicleService';

const useFetchVehicles = (token: string) => {
  const [vehicles, setVehicles] = useState<CartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const vehiclesData = await getVehicles(token);
      setVehicles(vehiclesData);
    } catch (error) {
      setError(error.message);
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

  return { vehicles, loading, error, refetch };
};

export default useFetchVehicles;
