import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetUser(url) {
    const [UserDATA, setUserDATA] = useState(null);
    const [UserLoading, setUserLoading] = useState(false);
    const [UserError, setUserError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            setUserLoading(true);
            setUserError(null);
            setUserDATA(null);

            try {
                const response = await fetch(url,);
                setUserDATA(response.data.content || response.data || response.content);
            } catch (err) {
                setUserError('An error occurred. fetch ..');
            } finally {
                setUserLoading(false);
            }
        };

        fetchData();

        return () => {
            source.cancel();
        };
    }, [url]);

    return { UserDATA, UserLoading, UserError };
}

export default useGetUser;
