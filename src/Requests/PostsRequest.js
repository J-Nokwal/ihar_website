import axios from "axios";

export class PostRequest {
    static async createPost(post){
        try {
            var response =await axios({
                url:'/post',
                method:"post",
                data:post,
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getPostForUser(postId,userId){
        try {
            var response =await axios({
                url:`/post/${postId}/${userId}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getAllPostForUser(byUser){
        try {
            var response =await axios({
                url:`/post/all/${byUser}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getAllPostOfUserForUser(ofUser,byUser){
        try {
            var response =await axios({
                url:`/post/all/OfUser/${ofUser}/${byUser}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async patchPost(post){
        try {
            var response =await axios({
                url:'/user',
                method:"patch",
                data:post
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async deletePost(id){
        try {
            var response =await axios({
                url:`/user/${id}`,
                method:"delete",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getPostByPageIdByUser(pageId = 0, byUser, queryTime){
        try {
            var response =await axios({
                url:`/post/byPage/${pageId}/${byUser}`,
                params:{
                    queryTime: queryTime
                },
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