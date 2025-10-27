import { useState } from "react";
import { X } from "lucide-react";

export const AddTransaction = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        category: "",
        type: "expense",
        description: "",
        paymentMethod: "cash",
        amount: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault;
        onAdd(form);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <select
                        value={form.paymentMethod}
                        onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                        className="w-full border p-2 rounded"
                    >
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="upi">Upi</option>
                        <option value="other">Other</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};
