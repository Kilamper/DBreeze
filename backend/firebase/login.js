import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user information to localStorage
    localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));
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