import { admin } from './firebaseAdmin';

export async function verifyIdToken(token: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (err) {
        console.error('Token verification failed:', err);
        return null;
    }
}