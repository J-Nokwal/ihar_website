import axios from "axios";

export class AvatarRequests {
    static async getNewAvatar() {
        var seed = Date.now().toString()
        try {
            var response = await axios({
                url: `https://avatars.dicebear.com/api/adventurer-neutral/${seed}.png?scale=80`,
                method: "get",
                responseType: 'blob'
            });

            return response.data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}
