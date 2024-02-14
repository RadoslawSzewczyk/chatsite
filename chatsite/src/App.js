import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { userAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAo-ToS8DZwoe4t8G4X2eDyPsVchHHYJ0k",
  authDomain: "chat-site-fire.firebaseapp.com",
  projectId: "chat-site-fire",
  storageBucket: "chat-site-fire.appspot.com",
  messagingSenderId: "315045608422",
  appId: "1:315045608422:web:cf28af9149411d20057427",
  measurementId: "G-5CSLBPRWWJ"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = userAuthState(auth);

  return (
    <div className = "App">
      <header>

      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  )
}

function SignIn(){

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )

}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idfield:'id'});
}

export default App;
