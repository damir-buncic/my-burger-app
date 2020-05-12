import axios from "axios"

export default axios.create({
  baseURL: "https://my-burger-app-c6605.firebaseio.com/"
});