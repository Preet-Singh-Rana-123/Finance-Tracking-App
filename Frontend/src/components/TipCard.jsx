export const TipCard = () => {
  return (
    <div className="bg-linear-65 from-blue-600 to-sky-400 rounded-xl shadow-lg p-6 text-white m-[2rem] flex flex-col items-center ">
      <h2 className="font-bold text-2xl mb-2">AI Financial Tip</h2>
      <p>
        Your transportation costs are trending up. Consider carpooling or public
        transit.
      </p>
      <button className="bg-gray-100 text-black p-3 rounded-2xl mt-2 hover:bg-sky-100 cursor-pointer duration-300">Get More Tips</button>
    </div>
  );
};
