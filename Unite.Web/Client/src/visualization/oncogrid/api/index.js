import settings from "@/settings";
import ApiClient from "@/_shared/api/api-client";

const client = new ApiClient();
const oncogridUrl = `${settings.urls.composer}/oncogrid`;

async function search(donors, genes, criteria) {
    console.log(donors);
    console.log(genes);
    
    let url = `${oncogridUrl}?donors=${donors.value}&genes=${genes.value}`;
    return await client.post(url, criteria);
}

export default {
    search
}