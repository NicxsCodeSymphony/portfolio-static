import {useState, useEffect} from "react";
import {Services} from '@/constant/FirebaseData'
import axios from 'axios'


export const useServiceData = () => {
    const [data, setData] = useState<Services[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get("/api/service")
                const rawData = res.data
                const cleaned: Services[] = Object.values(rawData)
                setData(cleaned)
            }
            catch(err: unknown){
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Unknown error")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    return {data, loading, error}
}