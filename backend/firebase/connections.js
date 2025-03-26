import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';

export const saveDatabaseConnection = async (userId, name, dbConfig) => {
    try {
        // Reference to the user's connections collection
        const connectionId = doc(collection(db, 'users', userId, 'connections')).id;
        const userConnectionsRef = doc(db, 'users', userId, 'connections', connectionId);

        // Add the connection data to the document
        await setDoc(userConnectionsRef, {
            name,
            dbConfig,
        });
    } catch (error) {
        console.error('Error saving database connection:', error);
        throw error;
    }
}

export const getAllDatabaseConnections = async (userId) => {
    try {
        // Reference to the user's connections collection
        const userConnectionsRef = collection(db, 'users', userId, 'connections');

        // Fetch all documents in the collection
        const snapshot = await getDocs(userConnectionsRef);

        // Map documents to an array of connection objects
        const connections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return connections;
    } catch (error) {
        console.error('Error retrieving database connections:', error);
        throw error;
    }
}
