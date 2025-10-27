import api from "./api";

export const getAiInsightApi = async () => {
    const res = await api.get('/ai/');
    return res;
}
