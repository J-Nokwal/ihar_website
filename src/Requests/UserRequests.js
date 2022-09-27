import axios from "axios";

export class UsersRequests {
    static async createUser(user){
        try {
            var response =await axios({
                url:'/user',
                method:"post",
                data:user,
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getUser(id){
        try {
            var response =await axios({
                url:`/user/${id}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async patchUser(user){
        try {
            var response =await axios({
                url:'/user',
                method:"patch",
                data:user,
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async isServerOnline(){
        try {
            var response =await axios({
                url:'http://192.168.18.29:8080/isServerOnline',
                method:"get",
               params:{}
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }

}