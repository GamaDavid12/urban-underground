import { useState, useCallback } from 'react';
import { axiosAPI } from '../api/api.js';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosAPI({
        method,
        url,
        data,
        ...config
      });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error desconocido';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};