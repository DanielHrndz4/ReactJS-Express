import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la solicitud");
        const result = await response.json();
        setData(result.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    if (url) fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;