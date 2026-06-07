import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="flex justify-between p-[1rem] shadow-md bg-gray-50 rounded-xl">
            <h3 className="text-2xl font-bold text-blue-500">
                <Link to="/">FinTrack</Link>
            </h3>

            <div className="flex gap-4 mx-4 font-semibold">
                <Link
                    className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                    to="/transaction"
                >
                    Transactions
                </Link>

                <Link
                    className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                    to="/budget"
                >
                    Budget
                </Link>

                <Link
                    className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                    to="/aiInsight"
                >
                    AI Insights
                </Link>

                <Link
                    className="hover:bg-gray-300 p-2 px-4 rounded-xl duration-300"
                    to="/login"
                >
                    {user ? "Logout" : "Login"}
                </Link>
            </div>
        </div>
    );
};
