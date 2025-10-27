import { useEffect, useState } from "react";
import { getAiInsightApi } from "../api/aiInsightApi";
import { Navbar } from "../components/Navbar";

export const AiInsight = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAiInsight = async () => {
            setLoading(true);
            const res = await getAiInsightApi();
            console.log(res.data);
            setSummary(res.data);
            console.log(res.data);
            setLoading(false);
        };

        fetchAiInsight();
    }, []);


    return (
        <>
            <Navbar />
            {loading ? (
                <p className="text-center m-[4rem]">Loading Budget Summary....</p>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto m-[2rem]">
                    {/* Advice Section */}
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                        Advice
                    </h3>

                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        {summary.advice.good.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>

                    <div className="space-y-1 text-gray-700 mb-6">
                        <p>
                            <span className="font-semibold text-gray-800">Tip:</span>{" "}
                            {summary.advice.tip}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Next Month:</span>{" "}
                            {summary.advice.next_month}
                        </p>
                    </div>

                    {/* Summary Section */}
                    <h2 className="text-xl font-semibold text-gray-800 border-t pt-4 mt-4 mb-2">
                        Summary
                    </h2>

                    <div className="space-y-1 text-gray-700 mb-6">
                        <p>
                            <span className="font-medium text-gray-800">Total Budget:</span> ₹
                            {summary.summary.total_budget}
                        </p>
                        <p>
                            <span className="font-medium text-gray-800">Total Spent:</span> ₹
                            {summary.summary.total_spent}
                        </p>
                        <p>
                            <span className="font-medium text-gray-800">Percent Used:</span>{" "}
                            {summary.summary.percent_used}%
                        </p>
                    </div>

                    {/* Categories Table */}
                    <h3 className="text-xl font-semibold text-gray-800 border-t pt-4 mt-4 mb-3">
                        Categories
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-2 text-gray-700 font-semibold border-b">
                                        Category
                                    </th>
                                    <th className="text-left px-4 py-2 text-gray-700 font-semibold border-b">
                                        Spent (₹)
                                    </th>
                                    <th className="text-left px-4 py-2 text-gray-700 font-semibold border-b">
                                        Budget (₹)
                                    </th>
                                    <th className="text-left px-4 py-2 text-gray-700 font-semibold border-b">
                                        Used (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.categories.map((c, i) => (
                                    <tr
                                        key={c.name}
                                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-4 py-2 text-gray-800 font-medium border-b">
                                            {c.name}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 border-b">
                                            ₹{c.spent}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 border-b">
                                            ₹{c.budget}
                                        </td>
                                        <td className="px-4 py-2 text-gray-700 border-b">
                                            {c.percent}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};
