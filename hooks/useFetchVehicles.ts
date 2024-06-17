import { useState, useEffect } from 'react';
import { getVehicles, CartData } from '../services/cartService';

const useFetchVehicles = (token: string) => {
  const [vehicles, setVehicles] = useState<CartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchData();
  }, [token]);

  return { vehicles, loading, error };
};

export default useFetchVehicles;
