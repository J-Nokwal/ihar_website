import axios from "axios";

export class isSewrverOnlineRequests  {
    static async check()  {
        try {
            var response =await axios({
                url:`/isServerOnline`,
                method:"post",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    
  }
  