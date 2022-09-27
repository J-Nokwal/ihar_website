import axios from "axios";

export  class  SearchRequests  {
    static async getSearchResults( byUser, searchQuery)  {
        try {
            var response =await axios({
                url:`/search/${searchQuery}/${byUser}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
  }
  