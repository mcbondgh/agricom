import axios from 'axios'

const FarmerService = {
    registerFarmer: async (farmerData) => {
        try {
            const response = await axios.post("http://localhost:3001/agricom/farmers/register", farmerData)
            const data = response.data;
            if (response.status === 200) {
                return { success: true, farmer: data.farmer, message: data.message};
              } else {
                return { success: false, message: data.message || "registration failed" };
              }
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Server error" };
        }
    } ,
    // Fetch all farmers
    getAllFarmers: async () => {
        try {
            const response = await axios.get("http://localhost:3001/agricom/farmers", {withCredentials: true})
            const farmers = response.data;
            if (response.status === 200) {
                return { success: true, farmers: farmers };
            } else {
                return { success: false, message: "Failed to fetch farmers" };
            }
        } catch (error) {
            console.error("AuthService Error:", error);
            return null;
        }
    },
    updateFarmer: async (farmerData) => {
        try {
            const response = await axios.post("http://localhost:200/agricomfarms/agrocom/updatefarmer", farmerData)
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Server error" };
        }
    } ,
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