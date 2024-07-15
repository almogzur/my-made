import { useState, useEffect } from 'react';

const useGetUser = (email) => {
  
  const [UserData, setUserData] = useState(null);
  const [dbloading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading("loading");
      setError(null);
      setUserData(null);

      try {
        const res = await fetch(`/api/getuser?email=${email}`);
        
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

  return { UserData, dbloading, error };
};

export default useGetUser;
