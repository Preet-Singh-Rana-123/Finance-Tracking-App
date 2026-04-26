export const HomeCard = ({ category, balance }) => {
    const iconUse = () => {
        if (category === "Current Balance") {
            return (
                <div className="border-2 border-blue-600 h-fit rounded-full px-[10px] text-blue-600 text-4xl bg-blue-100">
                    <span>&#8377;</span>
                </div>
            );
        } else if (category === "Monthly Income") {
            return (
                <div className="border-2 border-green-600 h-fit rounded-full px-[10px] text-green-600 text-4xl bg-green-100">
                    <span>&#8599;</span>
                </div>
            );
        } else if (category === "Monthly Expenses") {
            return (
                <div className="border-2 border-red-600 h-fit rounded-full px-[10px] text-red-600 text-4xl bg-red-100">
                    <span>&#8600;</span>
                </div>
            );
        } else {
            return (
                <div className="border-2 border-yellow-600 h-fit rounded-full px-[10px] text-yellow-600 text-4xl bg-yellow-100">
                    <span>&#223;</span>
                </div>
            );
        }
    };

    return (
        <>
            <div className="flex justify-between shadow-xl w-[300px] rounded-xl p-[1rem] mx-[1rem] bg-gray-50 items-center">
                <div className="flex flex-col justify-center">
                    <p className="mb-[0.5rem]">{category}</p>
                    <h2 className="font-bold text-3xl mb-[0.5rem]">₹{balance}</h2>
                </div>

                {iconUse()}
            </div>
        </>
    );
};
