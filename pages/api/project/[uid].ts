import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/firebaseAdmin';
import { ProjectData } from '@/constant/FirebaseData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { uid } = req.query;

    if (!uid || typeof uid !== 'string') {
        return res.status(400).json({ error: "Invalid UID" });
    }

    console.log('API: Fetching project with UID:', uid);
    console.log('API: Environment check:', {
        FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID,
        FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY,
        FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_DATABASE_URL: !!process.env.FIREBASE_DATABASE_URL
    });

    try {
        const snapshot = await db.ref(`projects/${uid}`).once('value');
        const data = snapshot.val() as Omit<ProjectData, 'uid'> | null;

        if (!data) {
            console.log('API: Project not found for UID:', uid);
            return res.status(404).json({ error: "Project not found" });
        }

        console.log('API: Project found for UID:', uid);
        return res.status(200).json({ uid, ...data });
    } catch (error) {
        console.error("API: Error retrieving project:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
