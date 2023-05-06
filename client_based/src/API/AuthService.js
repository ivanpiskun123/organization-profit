import axios from "axios";

export default class AuthService {

    static async athenticate(email, password){
      const response =  axios.post('http://0.0.0.0:3000/users/sign_in', {
               user: {
                 email: email,
                 password: password
               }
             })
        return response
    }

}
