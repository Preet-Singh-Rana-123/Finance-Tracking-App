export const TransactionTable = ({ transactions }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-2xl mt-[4rem] flex flex-col justify-center items-center">
            <table className="text-sm text-left border-collapse w-[700px] rounded-2xl">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-3 border-b">Date</th>
                        <th className="px-4 py-3 border-b">Category</th>
                        <th className="px-4 py-3 border-b">Description</th>
                        <th className="px-4 py-3 border-b text-center">Payment Method</th>
                        <th className="px-4 py-3 border-b">Type</th>
                        <th className="px-4 py-3 border-b text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-500">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((t) => (
                            <tr key={t._id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 border-b">
                                    {new Date(t.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {t.category || "—"}
                                </td>
                                <td className="px-4 py-3 border-b">{t.description}</td>
                                <td className="px-4 py-3 border-b text-center">{t.paymentMethod}</td>
                                <td className="px-4 py-3 border-b capitalize">{t.type}</td>
                                <td
                                    className={`px-4 py-3 border-b text-center font-medium ${t.type === "expense" ? "text-red-500" : "text-green-600"
                                        }`}
                                >
                                    {t.type === "expense" ? "-" : "+"}Rs. {t.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
