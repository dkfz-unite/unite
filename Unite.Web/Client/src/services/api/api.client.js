import axios from 'axios';

class ApiClient{
    async get(url){
        try{
            var response = await axios.get(url);
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
    }

    async post(url, body){
        try{
            var response = await axios.post(url, body);
            return response.data;
        }
        catch(error){
            console.error(error);
            return null;
        }
    }
}

export default new ApiClient();