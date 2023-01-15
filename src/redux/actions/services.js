import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth, db} from '../../config/firebaseConfig';
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore/lite';

export function signInUserToFirebase (auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function signOutUserFromFirebase (auth, email, password) {
    return signOut(auth)
}

export async function getProducts () {
    const productsCol = collection(db, 'Products');
    return getDocs(productsCol);
  };
