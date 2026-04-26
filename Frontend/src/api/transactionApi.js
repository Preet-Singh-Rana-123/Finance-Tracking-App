import api from "./api";

export const getTransactionApi = () => {
    const res = api.get("/transaction/");
    return res;
};

export const postTransactionApi = (formData) => {
    const res = api.post("/transaction/", formData);
    return res;
};

export const updateTransactionApi = (formData, id) => {
    const res = api.put(`/transaction/${id}`, formData);
    return res;
};

export const getCardInfo = async () => {
    const res = api.get("/transaction/get-dashboard-card-info");
    return res;
};

export const getIncomeExpense = async () => {
    const res = api.get("/transaction/get-income-expense");
    return res;
};
