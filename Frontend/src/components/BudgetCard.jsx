export const BudgetCard = ({ title, used, total, onEdit, onDelete }) => {
    const percent = Math.min((used / total) * 100, 100).toFixed(2);

    // decide bar color
    let barColor = "bg-green-500";
    if (percent >= 90) {
        barColor = "bg-red-500";
    } else if (percent >= 75) {
        barColor = "bg-yellow-500";
    }

    return (
        <div className="w-full sm:w-[280px] md:w-[300px] lg:w-[350px] p-4 rounded-2xl shadow-md hover:border-2 duration-[100] cursor-pointer">
            {/* Header */}
            <div className="flex mb-4 justify-between items-center">
                <h2 className="font-bold text-base md:text-lg">{title}</h2>
                <div className="flex gap-3 text-sm md:text-base">
                    <button onClick={onDelete}>
                        <i className="fa fa-trash cursor-pointer"></i>
                    </button>
                    <button onClick={onEdit}>
                        <i className="fa fa-pencil cursor-pointer"></i>
                    </button>
                </div>
            </div>

            {/* Spent row */}
            <div className="flex justify-between mb-2 text-xs md:text-sm font-semibold">
                <p>Spent</p>
                <p>&#8377; {used}</p>
            </div>

            {/* Progress bar */}
            <div className="bg-slate-200 rounded-full h-3 overflow-hidden mb-2">
                <div
                    className={`h-3 rounded-full transition-all duration-700 ease-in-out ${barColor}`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            {/* Budget row */}
            <div className="flex justify-between mb-2 text-xs md:text-sm font-semibold">
                <p>&#8377; {total} budget</p>
                <p>{percent}%</p>
            </div>
        </div>
    );
};
