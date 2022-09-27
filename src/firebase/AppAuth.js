import { coreAuth } from "../firebase/firebasecore";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    sendEmailVerification,
    sendSignInLinkToEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut

} from 'firebase/auth'


class AppAuth {
    constructor() {
        this.auth = coreAuth;
        this.AuthChangeFunction=(user)=>{};
        this.isAuthStreamOn=false;

    }
    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(this.auth, provider)
            .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                })
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            throw Error("Error while siging with google")
        }

    }
    async sendSignInLinkToEmail(email, user) {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://iheardarumor.web.app/',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.iharFlutter'
            },
            android: {
                packageName: 'com.example.ihar_flutter',
                installApp: true,
                minimumVersion: '19'
            },
            dynamicLinkDomain: 'example.page.link'
        };
        try {
            await sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            window.localStorage.removeItem('emailForSignIn');
            throw Error("Error sending email verification");
        }
    }
    async signUpWithEmail(email, password) {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://iheardarumor.web.app/',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.iharFlutter'
            },
            android: {
                packageName: 'com.example.ihar_flutter',
                installApp: true,
                minimumVersion: '19'
            },
            dynamicLinkDomain: 'example.page.link'
        };
        try {
            var userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            
        } catch (error) {
            if (error.code === 'weak-password') {
                throw Error("The password provided is too weak");
            } else if (error.code === 'email-already-in-use') {
                // await sendEmailVerification(userCredential.user, actionCodeSettings);
                throw Error("Email Already in use")
            }
            else
                throw Error('Error while creating Account')
            }
            try {
                await sendEmailVerification(userCredential.user, actionCodeSettings);
        } catch (error) {
            throw Error("Error while Sending Email Verification Mail.");
        }
    }
    async signInWithEmail(emailAdress, password) {
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://iheardarumor.web.app/',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.iharFlutter'
            },
            android: {
                packageName: 'com.example.ihar_flutter',
                installApp: true,
                minimumVersion: '19'
            },
            dynamicLinkDomain: 'example.page.link'
        };
        try {
            var userCredential = await signInWithEmailAndPassword(this.auth, emailAdress, password);
            
        } catch (error) {
            if (error.code === 'user-not-found') {
                throw Error("No user found for that email.",);
            } else if (error.code === 'wrong-password') {
                throw Error("Wrong password provided",);
            } else {
                throw Error("Error while siging",);
            }
        }
        if (userCredential.user && userCredential.user.emailVerified) {
        } else if (!userCredential.user.emailVerified) {
            await sendEmailVerification(userCredential.user, actionCodeSettings).catch((e) => { });
            throw Error("Email Not Verified");

        }
    }
    async signInAnonymously() {
        try {
            var userCredential = await signInAnonymously(this.auth);
            
        } catch (error) {
            throw Error("Error while Signing in.")
        }
    }
    async updateUserData({ displayName, profilePhoto } = {}) {
        try {
            if (displayName === null) {
                updateProfile(this.auth.currentUser, { displayName: displayName });
            } else if (profilePhoto === null) {
                updateProfile(this.auth.currentUser, { photoURL: profilePhoto });
            }
        } catch (error) {
            throw Error("Error Whilr Updating data.");
        }
        
    }
    async signOut(){
        await signOut(this.auth.currentUser).catch((e)=>{
            throw Error("Error while Signing out");
        })
    }
}
export const auth = coreAuth;
export const appAuth =new AppAuth()