import {NextApiRequest, NextApiResponse} from "next";
import {db} from '@/lib/firebaseAdmin'
import {verifyIdToken} from "@/lib/verifyToken";
import {Hero, Awards, PersonalInfo} from '@/constant/FirebaseData'
const now = new Date().toISOString()

const authenticate = async(req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader?.startsWith('Bearer ')){
            res.status(401).json({error: "Unauthorized: Missing or malformed token"})
            return false
        }

        const token = authHeader?.split(' ')[1]
        const decodedToken = await verifyIdToken(token);
        if(!decodedToken){
            res.status(401).json({error: "Unauthorized: Invalid token"})
            return false
        }

        return true
    }
    catch(err){
        console.error(`Authetication Error: ${err}`)
        res.status(401).json({error: "Unauthorized"})
        return false
    }
}

const handleGet = async (_req: NextApiRequest, res: NextApiResponse) => {
    try{
        const heroSnaphot = await db.ref('hero').once('value')
        const heroData = heroSnaphot.val() as Record<string, Omit<Hero, 'uid'>> | null;
        const hero: Hero[] = heroData
        ? Object.entries(heroData).map(([uid, data]) => ({uid, ...data})) : []

        const personalSnapshot = await db.ref('personalInfo').once('value')
        const personalData = personalSnapshot.val() as Record<string, PersonalInfo> | null
        const personal = personalData
        ? Object.values(personalData).reduce((acc, curr, index) => {
            acc[index] = curr
                return acc
            }, {} as Record<number, PersonalInfo>) : {}

        const awardsSnapshot = await db.ref('awards').once('value')
        const awardsData = awardsSnapshot.val() as Record<string, Awards> | null
        const awards = awardsData
        ? Object.values(awardsData).reduce((acc, curr, index) => {
            acc[index] = curr
                return acc
            }, {} as Record<number, Awards>): {}

        const completeData = hero.map(item => ({
            ...item,
    personal,
            awards,
        }))

        return res.status(200).json(completeData)
    }
    catch(err: unknown){
        console.error('Error fetching hero data', err)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method  = req.method || 'GET';
    const protectedMethods = ['POST', 'PUT', 'DELETE']

    if(method  === 'OPTIONS'){
        res.setHeader('Allow','GET,POST,PUT,DELETE,OPTIONS');
        return res.status(200).end()
    }

    if(protectedMethods.includes(method)){
        const isAuthenticate = await authenticate(req, res)
        if(!isAuthenticate) return
    }

    switch (method){
        case 'GET':
            return handleGet(req, res)
        // case 'POST':
        //     return handlePost(req, res)
        // case 'PUT':
        //     return handlePull(req, res)
        // case 'DELETE':
        //     return handleDelete
        default:
            return res.status(405).json({error: "Method not Allowed"})
    }
}