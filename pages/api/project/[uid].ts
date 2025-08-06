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

    try {
        const snapshot = await db.ref(`projects/${uid}`).once('value');
        console.log(snapshot)
        const data = snapshot.val() as Omit<ProjectData, 'uid'> | null;

        if (!data) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({ uid, ...data });
    } catch (error) {
        console.error("Error retrieving project:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
