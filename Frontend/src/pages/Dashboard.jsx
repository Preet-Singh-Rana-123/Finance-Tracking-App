import { useEffect, useState } from "react";
import { BarChart } from "../components/BarChart";
import { BudgetProgressBar } from "../components/BudgetProgressBar";
import { DoughnutChart } from "../components/DoughnutChart";
import { HomeCard } from "../components/HomeCard";
import { LineChart } from "../components/LineChart";
import { Navbar } from "../components/Navbar";
import { TipCard } from "../components/TipCard";
import { getCardInfo, getIncomeExpense } from "../api/transactionApi";
import { getAiTip } from "../api/aiInsightApi";
import { getCategorySpent } from "../api/budgetApi";

export const Dashboard = () => {
    const [budget, setBudget] = useState(0);
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [balance, setBalace] = useState(0);
    const [tip, setTip] = useState("Geting your tip...");
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const [monthlyExpense, setMonthlyExpense] = useState([]);
    const [incomeExpenseLabel, setIncomeExpenseLabel] = useState([]);
    const [category, setCategory] = useState([]);
    const [spent, setSpent] = useState([]);

    const fetchCategorySpent = async () => {
        try {
            const response = await getCategorySpent();
            const data = response.data;
            setCategory(data.category);
            setSpent(data.spent);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCardInfo = async () => {
        try {
            const response = await getCardInfo();
            const data = response.data;
            console.log(data);
            setBudget(data.budget);
            setExpense(data.expense);
            setBalace(data.balance);
            setIncome(data.income);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchBarChartInfo = async () => {
        try {
            const response = await getIncomeExpense();
            const data = response.data;
            setMonthlyIncome(data.income);
            setMonthlyExpense(data.expense);
            setIncomeExpenseLabel(data.labels);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAiTip = async () => {
        try {
            const response = await getAiTip();
            const data = response.data;
            setTip(data.tip);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCardInfo();
        fetchAiTip();
        fetchBarChartInfo();
        fetchCategorySpent();
    }, []);

    return (
        <>
            <Navbar />
            <div className="my-[2rem] flex flex-col justify-center items-center">
                <h2 className="font-bold text-4xl text-sky-500 mb-2">
                    Welcome to FinTrack!!
                </h2>
                <p className="underline">
                    Track your income, expenses, and budget progress
                </p>
            </div>
            <div className="flex justify-between mx-[1rem]">
                <HomeCard category={"Current Balance"} balance={balance} />
                <HomeCard category={"Monthly Income"} balance={income} />
                <HomeCard category={"Monthly Expenses"} balance={expense} />
                <HomeCard category={"Monthly Budget"} balance={budget} />
            </div>

            <BudgetProgressBar
                title={"Budget Progress (This Month)"}
                used={expense}
                total={income}
            />

            <TipCard tip={tip} />

            <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col mx-[2rem] h-[350px]">
                <h2 className="text-slate-700 font-semibold mb-2">
                    Spending by Category
                </h2>
                <div className="w-fit h-[450px] ">
                    <DoughnutChart category={category} spent={spent} />
                </div>
            </div>

            <div className="p-6 grid gap-8 md:grid-cols-2">
                <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col m-[2rem] h-[300px]">
                    <h2 className="text-slate-700 font-semibold mb-2">
                        Spending by Category
                    </h2>
                    <div className=" ">
                        <LineChart labels={incomeExpenseLabel} expense={monthlyExpense} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col m-[2rem] h-[300px]">
                    <h2 className="text-slate-700 font-semibold mb-2">
                        Spending by Category
                    </h2>
                    <div className=" ">
                        <BarChart
                            labels={incomeExpenseLabel}
                            income={monthlyIncome}
                            expense={monthlyExpense}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
