import api from "./api";

export const getBudgetApi = () => {
    const res = api.get('/budget');
    return res;
}

export const postBudgetApi = (formData) => {
    const res = api.post('/budget', formData);
    return res;
}

export const updateBudgetApi = (formData, id) => {
    const res = api.put(`/budget/${id}`, formData);
    return res;
}

export const deleteBudgetApt = (id) => {
    const res = api.delete(`/budget/${id}`);
    return res;
}
