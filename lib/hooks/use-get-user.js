import { useState, useEffect, useContext } from 'react';
import { ResolvedUserContext } from '../path-to-your-context-file'; // adjust the path accordingly

const useGetUser = (email) => {

  const [contextValue, setContextValue] = useContext(ResolvedUserContext);

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
        setContextValue(data);  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email && !contextValue) {
      fetchUserData();
    } else if (contextValue) {
      setUserData(contextValue);
    }
  }, [email, contextValue]);

  return { UserData, dbloading, error };
};

export default useGetUser;
