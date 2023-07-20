import axios from "axios";
import settings from "@/settings";

const tokenUrl = `${settings.urls.identity}/api/realm`;

function getTokenUrl(email, provider) {
    return `${tokenUrl}/${provider}/token?email=${email}`;
}

export async function refresh(email, provider) {
    const url = getTokenUrl(email, provider);
    try {
        const response = await axios.post(url);
        return response.data;
    } catch {
        return null;
    }
}

export default {
    refresh
}
