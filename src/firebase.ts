import {firestore} from '.'

export const generateUserDocument = async (user:any, name:any, location:any, phone:any, battery:any) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email } = user;
      try {
        await userRef.set({
          name,
          email,
          location,
          battery,
          phone
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return;
};

export const getUserDocument = async(uid:any)=> {
if (!uid) return null;
try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
    uid,
    ...userDocument.data()
    };
} catch (error) {
    console.error("Error fetching user", error);
}
};