import axios from "axios";
import jsonpAdapter from "axios-jsonp";

export class CommentsRequests {
    static async createComment(comment){
        try {
            var response =await axios({
                url:'/comment',
                method:"post",
                data:comment,
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async getAllCommentForPost(postId){
        try {
            var response =await axios({
                url:`/comment/all/${postId}`,
                method:"get",
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async deleteComment(id){
        try {
            var response =await axios({
                url:`/comment/${id}`,
                method:"delete",
                data:user,
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
    static async patchComment(comment){
        try {
            var response =await axios({
                url:'/comment',
                method:"patch",
               data:comment
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }

}