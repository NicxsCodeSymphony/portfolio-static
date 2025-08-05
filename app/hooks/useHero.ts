import {useState, useEffect} from "react";
import {Hero, PersonalInfo} from '@/constant/FirebaseData'
import axios from 'axios'

export type completeData = Omit<Hero, 'uid'> & {
    personal: PersonalInfo[]
    awards: Record<string, unknown>
}

export const useHeroData = () => {
    const [data, setData] = useState<completeData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get("/api/hero")
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