import * as firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ3qTShzA-qUNaoTLgWU5lL1XLo4BSYm4",
  authDomain: "devter-b77d3.firebaseapp.com",
  projectId: "devter-b77d3",
  storageBucket: "devter-b77d3.appspot.com",
  messagingSenderId: "405804111382",
  appId: "1:405804111382:web:05de10f00f2583f211c737",
  measurementId: "G-5E709YJ56V"
};

firebase.initializeApp(firebaseConfig);

export interface UserProfile {
  avatar: string;
  username: string;
  url: string;
}

interface GitHubProfile {
  avatar_url: string;
  blog: string;
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider() 

  return firebase.auth().signInWithPopup(githubProvider)
    .then((user: firebase.auth.UserCredential): UserProfile => {
      const { additionalUserInfo } = user;
      const { username, profile } = additionalUserInfo as firebase.auth.AdditionalUserInfo & { profile: GitHubProfile };
      const { avatar_url, blog } = profile;

      return {
        avatar: avatar_url,
        username,
        url: blog
      }
    })
}
