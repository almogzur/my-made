import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())


function useOrders (city) {
  
 const { data, error, isLoading ,mutate ,isValidating } = useSWR( city? `/api/bord/orders/?city=${city}` : null, fetcher ,{} )
 
    return {
      orders: data,
      orderError : error ,
      isOrderLoading: isLoading,
      mutateOrder: mutate,
      isOrderValidating : isValidating
    }
  }
export default useOrders


