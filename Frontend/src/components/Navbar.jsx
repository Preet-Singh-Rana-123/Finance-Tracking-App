import { useSelector } from "react-redux";

export const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div className="flex justify-between p-[1rem] shadow-md bg-gray-50 rounded-xl">
                <h3 className="text-2xl font-bold text-blue-500">
                    <a href="/">FinTrack</a>
                </h3>
                <div className="flex gap-4 mx-4 font-semibold">
                    <a
                        className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                        href="transaction"
                    >
                        Transactions
                    </a>
                    <a
                        className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                        href="/budget"
                    >
                        Budget
                    </a>
                    <a
                        className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                        href="/aiInsight"
                    >
                        AI Insightst
                    </a>
                    <a
                        className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                        href="/login"
                    >
                        {user ? "Logout" : "Login"}
                    </a>
                </div>
            </div>
        </>
    );
};
