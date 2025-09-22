export const Navbar = () => {
  return (
    <>
    <div className="flex justify-between p-[1rem] shadow-md bg-gray-50 rounded-xl">
      <h3 className="text-2xl font-bold text-blue-500"><a href="#">Finance Tracker App</a></h3>
      <div className="flex gap-4 mx-4 font-semibold" >
        <a className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300" href="#">Transactions</a>
        <a className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300" href="#">Budget</a>
        <a className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300" href="#">AI Insightst</a>
        <a className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300" href="#">Login</a>
      </div>
    </div>
    </>
  )
}