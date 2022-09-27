import axios from "axios";

export  class  LikeRequests  {
    static async triggerLike( likePostModal)  {
        try {
            var response =await axios({
                url:`/like`,
                method:"post",
                data:likePostModal
            }
            );
            return response.data;
        }  catch (error) {
            console.log(error)
            throw error;
        }
    }
     static async getUsersByPostLike(postId)  {
        try {
            var response =await axios({
                url:`/like/byPostId/${postId}`,
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
  