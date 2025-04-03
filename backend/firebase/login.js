import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = await getUserData(user.uid);

    localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email, name: userData.name }));
    window.location.reload();
  } catch (error) {
    alert('Error signing in: ' + error);
  }
};

export const signUp = async (name, email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role,
    });

    localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email, name: name }));
    window.location.reload();
  } catch (error) {
    alert('Error creating account: ' + error);
  }
};

export const signOut = () => {
  try {
    auth.signOut();
    localStorage.removeItem('user');
    window.location.reload();
  } catch (error) {
    alert('Error signing out: ' + error);
  }
};

const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.data();
  } catch (error) {
    alert('Error fetching user name: ' + error);
    return null;
  }
};