export const Budget = () => {
  return (
    <>
      <div className="my-[2rem] flex flex-col justify-center items-center">
        <h2 className="font-bold text-4xl text-sky-500 mb-2">
          Budget Management
        </h2>
        <p className="underline">Track and manage your category budgets</p>
      </div>

      {/*Budget spending cards*/}
      <div className="flex items-center justify-center">
        <div className="m-[2rem] w-fit shadow-md px-[2rem] py-[1rem] rounded-2xl ">
          <div className="flex gap-[1rem] justify-start">
            <span className="border-2 w-fit rounded-full px-[7px] text-[1rem]">
              &#8377;
            </span>
            <p className="text-[1rem]">Total Budget</p>
          </div>
          <h2 className="text-4xl font-bold mt-[0.5rem] ">&#8377; 36000</h2>
        </div>

        <div className="m-[2rem] w-fit shadow-md px-[2rem] py-[1rem] rounded-2xl ">
          <div className="flex gap-[1rem] justify-start">
            <span className="border-2 w-fit rounded-full px-[7px] text-[1rem]">
              &#8599;
            </span>
            <p className="text-[1rem]">Total Budget</p>
          </div>
          <h2 className="text-4xl font-bold mt-[0.5rem] ">&#8377; 36000</h2>
        </div>
      </div>
    </>
  );
};
