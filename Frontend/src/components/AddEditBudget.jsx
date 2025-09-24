import { useState, useEffect } from "react";

export const AddEditBudget = ({ isOpen, onClose, initialData, onSave }) => {
  const [budgetData, setBudgetData] = useState({
    name: "",
    amount: "",
    spent: "",
  });

  // Prefill when editing
  useEffect(() => {
    if (initialData) {
      setBudgetData({
        name: initialData.name || "",
        amount: initialData.budget || "",
        spent: initialData.spent || "",
      });
    } else {
      setBudgetData({ name: "", amount: "", spent: "" });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...initialData, // keep id if editing
      name: budgetData.name,
      budget: Number(budgetData.amount),
      spent: Number(budgetData.spent),
    };

    onSave(formattedData); // send data back
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-md w-full mx-4 p-6 bg-white rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {initialData ? "Edit Budget" : "Add New Budget"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={budgetData.name}
              onChange={handleChange}
              placeholder="e.g. Rent"
              className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Budget Amount */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="mb-1 font-semibold text-gray-700">
              Budget Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={budgetData.amount}
              onChange={handleChange}
              placeholder="0"
              className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Spent Amount */}
          <div className="flex flex-col">
            <label htmlFor="spent" className="mb-1 font-semibold text-gray-700">
              Amount Spent
            </label>
            <input
              type="number"
              id="spent"
              name="spent"
              value={budgetData.spent}
              onChange={handleChange}
              placeholder="0"
              className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              {initialData ? "Update Budget" : "Add Budget"}
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
