import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Signed in successfully!');
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

    alert('Account created successfully!');
  } catch (error) {
    alert('Error creating account: ' + error);
  }
};
