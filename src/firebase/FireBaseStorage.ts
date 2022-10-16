import { coreStorage } from "./firebasecore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
class AppFireBaseStorage {

    async uploadImage(file: File): Promise<string> {
        var date = new Date().toISOString();
        var imagesRef = ref(coreStorage, "images/" + date + file.name)
        await uploadBytes(imagesRef, file);
        var downloadURL = await getDownloadURL(imagesRef);
        return downloadURL;
    }
    async uploadProfilePic(file: File): Promise<string> {
        var date = new Date().toISOString();
        var profilePicsRef = ref(coreStorage, "profilePics/" + date + file.name)
        await uploadBytes(profilePicsRef, file);
        var downloadURL = await getDownloadURL(profilePicsRef);
        return downloadURL;
    }
}
export const appFireBaseStorage=new AppFireBaseStorage()