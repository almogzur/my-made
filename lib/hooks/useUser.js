import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())


function useUser (email) {
  

 const { data, error, isLoading ,mutate ,isValidating } = useSWR( `/api/user?email=${email}`, fetcher ,{  }
          )
 
    return {
      user: data,
      isLoading,
      isError: error,
      mutate,
      isValidating
    }
  }
export default useUser


