// fetchMovies
// fetchMovieDetails
import { useEffect, useState } from 'react';

// 20 movies limit for page by default
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction(); // fFunction got from props

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('an Error occurred!'));
    } finally {
      // end loading anyway
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // as soon as the component loads
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
