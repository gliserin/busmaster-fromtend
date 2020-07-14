import axios from "axios";

export default axios.create({
  baseURL: "http://172.16.1.194:3000/api/",
});
