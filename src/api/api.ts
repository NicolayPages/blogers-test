import axios from "axios";


const instance = axios.create({
   baseURL: "https://jsonplaceholder.typicode.com/",
   headers: {
      "Content-type": "application/json; charset=UTF-8",
   },
});



export const usersAPI = {
   getUsers() {
      return instance.get(`users`).then((response) => {
         return response;
      });
   },
};


export const postsAPI = {
   getPosts(userId: number, limit: number) {
      return instance.get(`posts`, {
         params: {
            userId: userId,
            _limit: limit,
         }
      }).then((response) => {
         return response;
      });
   },
};