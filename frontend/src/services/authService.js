import axios from 'axios'

const AuthService  = {
    // Login method: Sends username and password to the server
    login: async (userData) => {
        try {
            const response = await axios.post("http://localhost:200/agricom/auth/login", userData,{withCredentials: true})
            const data = response.data;
            if (response.status === 200) {
                return { success: true, user: data.session.user, authenticated: data.session.authenticated };
            } else {
                return { success: false, message: data.message || "Login failed" };
            }
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Server error" };
        }
    },

    // Logout method: Ends the user session
    logout: async () => {
        try {
            const response = await axios.post("http://localhost:200/agricom/auth/logout",{withCredentials: true})
            if (response.status == 200) {
                return { success: true };
            } else {
                return { success: false, message: "Logout failed" };
            }
        } catch (error) {
            console.error("Logout Error:", error);
            return { success: false, message: "Server error" };
        }
    }
                
}

export default AuthService;