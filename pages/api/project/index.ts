import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/firebaseAdmin';
import { ProjectData } from '@/constant/FirebaseData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        const projectSnapShot = await db.ref('projects').once('value');
        const projectData = projectSnapShot.val() as Record<string, Omit<ProjectData, 'uid'>> | null;
        const projects: (ProjectData & { uid: string })[] = projectData
            ? Object.entries(projectData).map(([uid, data]) => ({ uid, ...data }))
            : [];
        return res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}