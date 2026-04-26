export const BudgetProgressBar = ({ title, used, total }) => {
    const percent = Math.min((used / total) * 100, 100);

    let remark = "";
    let remarkColor = "text-slate-600";
    let barColor = "bg-green-500";

    if (percent < 70) {
        remark = "✅ You're on track!";
        remarkColor = "text-green-600";
        barColor = "bg-green-500";
    } else if (percent < 85) {
        remark = "🟡 Be mindful of your spending.";
        remarkColor = "text-yellow-600";
        barColor = "bg-yellow-400";
    } else if (percent < 100) {
        remark = "⚠️ Warning: Nearing budget limit.";
        remarkColor = "text-orange-600";
        barColor = "bg-orange-500";
    } else {
        remark = "🔴 Over budget! Take action.";
        remarkColor = "text-red-600 font-semibold";
        barColor = "bg-red-500";
    }

    return (
        <div className="mt-[4rem] m-[2rem] bg-white rounded-2xl shadow p-5 border border-slate-200">
            {/* Title */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
                <span className="text-sm font-medium text-slate-500">₹{total}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-3 rounded-full transition-all duration-700 ease-in-out ${barColor}`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            {/* Remark */}
            <p className={`mt-2 text-sm font-medium ${remarkColor}`}>{remark}</p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-slate-500">
                    Used: <span className="text-slate-700 font-medium">₹{used}</span>
                </span>
                <span className="text-slate-500">
                    Remaining:{" "}
                    <span className="text-slate-700 font-medium">₹{total - used}</span>
                </span>
            </div>
        </div>
    );
};
