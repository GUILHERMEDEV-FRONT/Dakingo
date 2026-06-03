import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User, Auth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, Firestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

export const isFirebaseConfigured = 
  firebaseConfig && 
  firebaseConfig.apiKey !== 'PLACEHOLDER' && 
  firebaseConfig.apiKey !== '';

let appInstance: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(appInstance, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(appInstance);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Failed to initialize Firebase with current credentials:", error);
  }
}

export { db, auth, googleProvider };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: AuthProviderInfo[];
  }
}

export interface AuthProviderInfo {
  providerId?: string | null;
  email?: string | null;
}

export interface AuthInfo {
  userId?: string | null;
  email?: string | null;
  emailVerified?: boolean | null;
  isAnonymous?: boolean | null;
  tenantId?: string | null;
  providerInfo?: AuthProviderInfo[];
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: (auth?.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId || null,
        email: provider.email || null,
      })) as AuthProviderInfo[]) || []
    } as AuthInfo,
    operationType,
    path
  };
  console.error('Firestore Error Payload: ', JSON.stringify(errInfo));
  // Avoid throwing JSON-encoded errors that can crash the UI loop.
  // Re-throw a human-readable Error while keeping payload for debugging.
  throw new Error(errInfo.error || 'Firestore operation failed');
}

export async function testFirestoreConnection() {
  if (!isFirebaseConfigured || !db) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. Connection test failed because client is offline.");
    }
    return false;
  }
}
