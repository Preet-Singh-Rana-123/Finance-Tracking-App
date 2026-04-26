import { useEffect, useState } from "react";
import { TransactionTable } from "../components/TransactionTable";
import { getTransactionApi, postTransactionApi } from "../api/transactionApi";
import { Navbar } from "../components/Navbar";
import { AddTransaction } from "../components/AddTransaction";
import { Plus } from "lucide-react";

export const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTransaction = async () => {
        const response = await getTransactionApi();
        setTransactions(response.data);
    };

    useEffect(() => {
        fetchTransaction();
    }, []);

    const handleAddTransaction = async (formData) => {
        const res = await postTransactionApi(formData);
        if (res.ok) {
            fetchTransaction();
            setShowModal(false);
        }
    };

    return (
        <>
            <Navbar />
            <TransactionTable transactions={transactions} />
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-8 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <Plus size={24} />
            </button>

            {showModal && (
                <AddTransaction
                    onClose={() => setShowModal(false)}
                    onAdd={handleAddTransaction}
                />
            )}
        </>
    );
};
