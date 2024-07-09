import { useState, useEffect } from 'react';

const useGetUser = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      setUserData(null);

      try {
        const res = await fetch(`http://localhost:3000/api/getuser?email=${email}`);
        
        if (!res.ok) {
          throw new Error('Error fetching data');
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return { userData, loading, error };
};

export default useGetUser;
