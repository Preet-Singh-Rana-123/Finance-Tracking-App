const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const Budget = require("../models/Budget");
const Transactions = require("../models/Transactions");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getAiInsight = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const budgets = await Budget.find({ user: userId }).populate("category");

        const progress = await Promise.all(
            budgets.map(async (b) => {
                const agg = await Transactions.aggregate([
                    {
                        $match: {
                            user: b.user,
                            type: "expense",
                        },
                    },
                    { $group: { _id: null, spent: { $sum: "$amount" } } },
                ]);

                const spent = agg[0]?.spent || 0;
                const percent = Math.round((spent / b.amount) * 100);

                return {
                    category: b.category.name,
                    budget: b.amount,
                    spent,
                    percent,
                };
            }),
        );
        const prompt = `
      You are an AI financial assistant. 
      The user has the following monthly budgets and expenses:
      ${progress
                .map(
                    (p) =>
                        `Category: ${p.category} | Budget: $${p.budget} | Spent: $${p.spent} (${p.percent}%)`,
                )
                .join("\n")}
      
      Based on this data:
      - Identify overspending and give friendly advice.
      - Highlight good savings habits.
      - Suggest one actionable tip for next month.
      Write in a simple, friendly tone.
      Also made a summary table of their monthly expense.
    `;
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {role: 'system', content: "You are a helpful finance assistant."},
                {role: 'user', content: prompt},
            ],
        });

        const insight = response.choices[0].message.content;
        res.json({insight, data: progress});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};
