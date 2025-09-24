import { useState, useEffect } from 'react';
import { BudgetCard } from '../components/BudgetCard';
import { Navbar } from '../components/Navbar';
import { AddEditBudget } from '../components/AddEditBudget';

export const Budget = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      name: 'Groceries',
      icon: '🛒',
      spent: 250,
      budget: 500,
      color: '#10B981',
    },
    {
      id: 2,
      name: 'Rent',
      icon: '🏠',
      spent: 1000,
      budget: 1000,
      color: '#EF4444',
    },
    {
      id: 3,
      name: 'Food & Dining',
      icon: '🍔',
      spent: 320,
      budget: 400,
      color: '#F59E0B',
    },
    {
      id: 4,
      name: 'Travel',
      icon: '✈️',
      spent: 200,
      budget: 400,
      color: '#3B82F6',
    },
    {
      id: 5,
      name: 'Entertainment',
      icon: '🎮',
      spent: 150,
      budget: 200,
      color: '#8B5CF6',
    },
  ]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    const totalBudgetValue = budgets.reduce((acc, p) => acc + p.budget, 0);
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

  const handleSaveBudget = (data) => {
    if (data.id) {
      // update existing
      setBudgets((prev) =>
        prev.map((b) => (b.id === data.id ? { ...b, ...data } : b)),
      );
    } else {
      // add new
      const newBudget = {
        ...data,
        id: Date.now(), // simple unique id
        icon: '📦', // default icon, you can improve later
        color: '#3B82F6', // default color
      };
      setBudgets((prev) => [...prev, newBudget]);
    }
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
            key={p.id}
            title={p.name}
            total={p.budget}
            used={p.spent}
            onEdit={() => handleEditClick(p)}
          />
        ))}
      </div>
    </>
  );
};
