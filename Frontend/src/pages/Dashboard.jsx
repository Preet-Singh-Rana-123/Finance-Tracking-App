import { BarChart } from '../components/BarChart';
import { BudgetProgressBar } from '../components/BudgetProgressBar';
import { DoughnutChart } from '../components/DoughnutChart';
import { HomeCard } from '../components/HomeCard';
import { LineChart } from '../components/LineChart';
import { TipCard } from '../components/TipCard';

export const Dashboard = () => {
  return (
    <>
      <div className="my-[2rem] flex flex-col justify-center items-center">
        <h2 className="font-bold text-4xl text-sky-500 mb-2">
          Welcome to Financial Tracker App!!
        </h2>
        <p className="underline">
          Track your income, expenses, and budget progress
        </p>
      </div>
      <div className="flex justify-between mx-[1rem]">
        <HomeCard
          category={'Current Balance'}
          balance={'$12,450.75'}
          trend={'+2.3% from last month'}
        />
        <HomeCard
          category={'Monthly Income'}
          balance={'$12,450.75'}
          trend={'+2.3% from last month'}
        />
        <HomeCard
          category={'Monthly Expenses'}
          balance={'$12,450.75'}
          trend={'+2.3% from last month'}
        />
        <HomeCard
          category={'Monthly Budget'}
          balance={'$12,450.75'}
          trend={'+2.3% from last month'}
        />
      </div>

      <BudgetProgressBar
        title={'Budget Progress (This Month)'}
        used={50}
        total={100}
      />

      <TipCard />

      <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col mx-[2rem] h-[350px]">
        <h2 className="text-slate-700 font-semibold mb-2">
          Spending by Category
        </h2>
        <div className="w-fit h-[450px] ">
          <DoughnutChart />
        </div>
      </div>

      <div className="p-6 grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col m-[2rem] h-[300px]">
          <h2 className="text-slate-700 font-semibold mb-2">
            Spending by Category
          </h2>
          <div className=" ">
            <LineChart />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center items-center flex-col m-[2rem] h-[300px]">
          <h2 className="text-slate-700 font-semibold mb-2">
            Spending by Category
          </h2>
          <div className=" ">
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};
