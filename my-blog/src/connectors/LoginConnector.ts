// Example of making a request to a protected route

import axios, { AxiosError } from "axios";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


interface LoginDetails {
  username: string,
  password: string
}

class LoginConnector {

  async fetchProtectedData() {
    const response = await fetch('/admin/only', {
      method: 'GET',
      credentials: 'include',  // This ensures cookies are sent with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Protected data:", data);
    } else {
      console.log("Unauthorized or session expired");
    }
  }


  // this login funciton will get the cookie back from the backend server.

  async login(loginDetails: LoginDetails) {

    try {
      const response =
        await axios.post(`${API_BASE_URL}/login`,
          loginDetails, {
          withCredentials: true,  // Ensures cookies are sent and received
        }
        );
      return { data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: axiosError.response?.data?.message ||
          '[LoginConnector][login] An error occurred while trying to login. Please check the username and password.'
      };
    }
  }


  async getRole() {
    const response =
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-user-role`, {
        withCredentials: true
      });
    return (response)
  };

}

export default new LoginConnector;