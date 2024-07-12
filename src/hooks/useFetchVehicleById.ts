import { useState, useEffect } from 'react';
import { CartData, getVehicleById } from '../services/vehicleService';

const useFetchVehicleById = (token: string, id: number) => {
  const [vehicle, setVehicle] = useState<CartData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const vehicleData = await getVehicleById(token, id);
      setVehicle(vehicleData);
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

  return { vehicle, loading, error, refetch };
};

export default useFetchVehicleById;
