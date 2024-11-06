import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())


function useUser (email) {
  

 const { data, error, isLoading ,mutate ,isValidating } = useSWR( email? `/api/get-user?email=${email}` : null, fetcher ,{  }
          )
 
    return {
      user: data,
      isLoading,
      isError: error,
       updateUser: mutate,
      isValidating
    }
  }
export default useUser


