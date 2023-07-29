import { useEffect, useState } from "react"
import Movie from "../interfaces/Movie";

type Return<T> = [
    T | null,
    unknown,
    boolean
]

export default function useApi<T>(url: string): Return<T>{

    const [ data, setData ] = useState<T | null>(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        fetch(url, {
            method: 'Get',
            headers:{
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmU4NmY4YjFhODhmZGMwZTk5NDUyNmNiY2Y4Mzg3YiIsInN1YiI6IjYzZjc0NGVmNjljNzBmMDA3ZDJhODZmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GIDfGpZOyBEZCOGVhZ7MRIYQGl4R1f1YYGacKAmPjlA'
            }
        }).then(async response => {
            const data: T = (await response.json()).results;
            setData(data)
        }).catch(error => {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    },[])

    return [ data, error, loading ];

}