'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { data: userData,isFetching,isLoading,error,isFetched
   } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
      axios.get('https://jsonplaceholder.typicode.com/users')
  })
  return (
    <>
      <div>
        <h1>Tanstack Query</h1>
        <h1>User Data </h1>
        {isFetching && <h1>Is Fatching</h1> } 
        {isLoading && <h1>Is Loading</h1> }
        {error && <h1>Error Occured</h1> }


        {userData?.data?.map((user: any) => (
          <div key={user.id}>
            <br />
            <h1>{user.id}</h1>
            <h1>{user.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
