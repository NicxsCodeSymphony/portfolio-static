import {NextApiRequest, NextApiResponse} from "next";
import {db} from '@/lib/firebaseAdmin'
import {verifyIdToken} from "@/lib/verifyToken";
import {Services} from '@/constant/FirebaseData'
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
        const heroSnaphot = await db.ref('services').once('value')
        const heroData = heroSnaphot.val() as Record<string, Omit<Services, 'uid'>> | null;
        const hero: Services[] = heroData
            ? Object.entries(heroData).map(([uid, data]) => ({uid, ...data})) : []

        return res.status(200).json(hero)
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