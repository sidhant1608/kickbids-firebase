import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {fireuser} from "../API/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    const settings = {timestampsInSnapshots: true};
    this.db.settings(settings);

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        fireuser(authUser.uid)
        .then(data => {
          if(data.error){
              fallback();
          } else {
            if (data[0] === undefined) {
              authUser = {
                uid: authUser.uid,
                idToken: authUser._lat,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                roles:  {
                  ADMIN: "NONE"
                },
                providerData: authUser.providerData
              }
              next(authUser);
            }
            else {
              authUser = {
                uid: authUser.uid,
                idToken: authUser._lat,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                roles:  data[0].roles,
                providerData: authUser.providerData
              }
              next(authUser);
            }
          }
      });
        // this.user(authUser.uid)
        //   .get()
        //   .then(snapshot => {
        //     const dbUser = snapshot.data();

        //     // default empty roles
        //     if (!dbUser.roles) {
        //       dbUser.roles = {};
        //     }

        //     // merge auth and db user
        //     authUser = {
        //       uid: authUser.uid,
        //       email: authUser.email,
        //       emailVerified: authUser.emailVerified,
        //       providerData: authUser.providerData,
        //       idToken: authUser._lat,
        //       ...dbUser,
        //     };
        //     console.log(authUser);
        //     next(authUser);
        //   });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.doc(`users/${uid}`);
  
  users = () => this.db.collection('users');

   // *** Categories API ***

  category = uid => this.db.doc(`categories/${uid}`);
  
  categories = () => this.db.collection('categories');

     // *** Products API ***

  product = uid => this.db.doc(`products/${uid}`);
  
  products = () => this.db.collection('products');

}

export default Firebase;
