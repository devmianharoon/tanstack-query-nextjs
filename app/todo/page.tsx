"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { useState } from "react";


interface Todo {
    id: number,
    title: string
}

export default function Todo() {
    const [text, setText] = useState('')
    const queryClient = useQueryClient()
    const mutation: any = useMutation<Todo>({
        mutationFn: (newTodo) => {
            return axios.post('http://localhost:4000/tods', newTodo)
        },
        onMutate(variables) {
            console.log('A Mutation is about to happen ');

        },
        onError(error, variables, context) {
            console.log('An error is occured ');
        },
        onSuccess(data, variables, context) {
            console.log("Sucess", data);
            queryClient.invalidateQueries({ queryKey: ["todo"] })
        },
    })
    const { data } = useQuery<any>({
        queryKey: ['todo'],
        queryFn: () =>
            axios.get('http://localhost:4000/tods'),
        
            
    })
console.log(data);

    return (
        <div>
            {mutation.isPending ? (
                'Adding todo...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}
                    {mutation.isSuccess ? <div>Todo added!</div> : null}
                    <input type="text" name="text" id="" placeholder="Input Todo" onChange={(e) => setText(e.target.value)} />
                    <button
                        onClick={() => {
                            mutation.mutate({ id: new Date(), title: text })
                        }}
                    >
                        Create Todo
                    </button>
                </>)}
                
            {data?.data.map((user: Todo) => (
                <div key={user.id}>
                    <br />
                    <h1>{user.id}</h1>
                    <h1>{String(user.title)}</h1>
                </div>
            ))}
        </div>
    )
};
