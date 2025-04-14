import axios from 'axios'

const FarmerService = {
    registerFarmer: async (farmerData) => {
        try {
            const response = await axios.post("http://localhost:200/agricomfarms/agrocom/registerfarmer", farmerData)
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Server error" };
        }
    } ,
    // Fetch all farmers
    getFarmers: async () => {
        try {
            const response = await axios.get("http://localhost:200/agricomfarms/agrocom/get-all", {withCredentials: true})
            const data = response.data;
            return data || null;
        } catch (error) {
            console.error("AuthService Error:", error);
            return null;
        }
    },
      // Fetch all farmers
      getOnlineDataTest: async () => {
        try {
            const response = await axios.get("https://reqres.in/api/users");
            return response.data || null;
        } catch (error) {
            console.error("getOnlineDataTest Error:", error);
            return null;
        }
    },
}

export default FarmerService;