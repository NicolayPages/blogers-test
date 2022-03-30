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
   getPosts() {
      return instance.get(`posts`).then((response) => {
         return response;
      });
   },
};