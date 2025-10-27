import { useState, useEffect } from "react";
import { BudgetCard } from "../components/BudgetCard";
import { Navbar } from "../components/Navbar";
import { AddEditBudget } from "../components/AddEditBudget";
import {
    deleteBudgetApt,
    getBudgetApi,
    postBudgetApi,
    updateBudgetApi,
} from "../api/budgetApi";

export const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    const fetchBudget = async () => {
        try {
            const response = await getBudgetApi();
            console.log(response.data);
            setBudgets(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBudget();
    }, []);

    useEffect(() => {
        const totalBudgetValue = budgets.reduce((acc, p) => acc + p.limit, 0);
        const totalSpentValue = budgets.reduce((acc, p) => acc + p.spent, 0);

        setTotalBudget(totalBudgetValue);
        setTotalSpent(totalSpentValue);
    }, [budgets]);

    const handleAddClick = () => {
        setEditingBudget(null);
        setIsOpen(true);
    };

    const handleEditClick = (budget) => {
        setEditingBudget(budget);
        setIsOpen(true);
    };

    const handleDeleteClick = async (budget) => {
        await deleteBudgetApt(budget._id);
        fetchBudget();
    };

    const handleSaveBudget = async (data) => {
        if (data._id) {
            // update existing
            await updateBudgetApi(data, data._id);
        } else {
            // add new
            await postBudgetApi(data);
        }
        setIsOpen(false);
        fetchBudget();
    };

    return (
        <>
            <Navbar />
            <div className="my-[2rem] flex flex-col justify-center items-center">
                <h2 className="font-bold text-4xl text-sky-500 mb-2">
                    Budget Management
                </h2>
                <p className="underline">Track and manage your category budgets</p>
            </div>

            {/* Totals */}
            <div className="flex items-center justify-center">
                <div className="m-[2rem] w-fit shadow-md px-[2rem] py-[1rem] rounded-2xl ">
                    <div className="flex gap-[1rem] justify-start">
                        <span className="border-2 w-fit rounded-full px-[7px] text-[1rem]">
                            &#8377;
                        </span>
                        <p className="text-[1rem]">Total Budget</p>
                    </div>
                    <h2 className="text-4xl font-bold mt-[0.5rem] ">
                        &#8377; {totalBudget}
                    </h2>
                </div>

                <div className="m-[2rem] w-fit shadow-md px-[2rem] py-[1rem] rounded-2xl ">
                    <div className="flex gap-[1rem] justify-start">
                        <span className="border-2 w-fit rounded-full px-[7px] text-[1rem]">
                            &#8599;
                        </span>
                        <p className="text-[1rem]">Total Spent</p>
                    </div>
                    <h2 className="text-4xl font-bold mt-[0.5rem] ">
                        &#8377; {totalSpent}
                    </h2>
                </div>
            </div>

            {/* Modal */}
            <AddEditBudget
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialData={editingBudget}
                onSave={handleSaveBudget}
            />

            {/* Add button */}
            <div className=" flex justify-center mb-[2rem] ">
                <button
                    onClick={handleAddClick}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                >
                    Add budget
                </button>
            </div>

            {/* Budget cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-[2rem]">
                {budgets.map((p) => (
                    <BudgetCard
                        key={p._id}
                        title={p.category}
                        total={p.limit}
                        used={p.spent}
                        onEdit={() => handleEditClick(p)}
                        onDelete={() => handleDeleteClick(p)}
                    />
                ))}
            </div>
        </>
    );
};
