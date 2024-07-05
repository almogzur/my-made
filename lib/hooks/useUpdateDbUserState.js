import { useState, useEffect } from 'react';


function useUpdateDbUserState( url ,state ) {
    

    const [DBUpdatedUser, setDBUpdatedUser] = useState(null);
    const [DBUserUpdateLoading, setDBUserUpdateLoading] = useState(false);
    const [DBUserUpdateEroor, setDBUserUpdateEroor] = useState(null);

   const headers =  {
        'Content-Type': 'application/json',
      }
 

    useEffect(() => {

        const fetchData = async () => {
            setDBUserUpdateLoading(true);
            setDBUserUpdateEroor(null);
            setDBUpdatedUser(null);

            try {
                console.log("imtring",url)
                const data = fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(state),
                    headers:headers
                  })
                  .then((data)=>{
                    setDBUpdatedUser(data)
                  })
         
               // setUpdatedUser(data);
                console.log(data,"responce")
            } catch (err) {
                setDBUserUpdateEroor('An error occurred. Awkward..');
            } finally {
                setDBUserUpdateLoading(false);
            }
        };

        fetchData();
    }, [url, state]);

    return { DBUpdatedUser, DBUserUpdateLoading, DBUserUpdateEroor };
}

export default useUpdateDbUserState;
