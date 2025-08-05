import {useState, useEffect} from "react";
import {About} from '@/constant/FirebaseData'
import axios from 'axios'

export type completeData = Omit<About, 'uid'> & {
    personalInfo: Record<string, unknown>
    awards: Record<string, unknown>
}

export const useAboutData = () => {
    const [data, setData] = useState<completeData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get("/api/about")
                const rawData = res.data
                const cleaned: completeData[] = Object.values(rawData)
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