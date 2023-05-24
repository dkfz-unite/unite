import axios from "axios";
import settings from "@/settings";

const tokenUrl = `${settings.urls.identity}/api/token`;

export async function refresh(login) {
    const url = `${tokenUrl}?login=${login}`;
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
