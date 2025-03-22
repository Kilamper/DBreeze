import React, { useState } from 'react';
import './index.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
    } catch (error) {
      alert('Error signing in: ' + error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1>Sign In</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <a className="forget" href="#">Forget your password?</a>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form onSubmit={handleSignUp}>
      <h1>Create Account</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <span>Role:</span>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Boss">Boss</option>
      </select>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

const LoginPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleLoginClick = () => setIsActive(true);
  const handleRegisterClick = () => setIsActive(false);

  return (
    <div className={`container ${isActive ? 'active' : ''}`} id="container">
      <div className="signIn">
        <SignInForm />
      </div>
      <div className="signIn">
        <SignUpForm />
      </div>
      <div className="overlap">
        <div className="toggle">
          <div className="overlap-right">
            <h1>Hello, Friend!</h1>
            <p>Register your personal details to use all of site features</p>
            <button id="login" onClick={handleLoginClick}>Sign Up</button>
          </div>
          <div className="overlap-left">
            <h1>Welcome back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button id="register" onClick={handleRegisterClick}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
