const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const Budget = require("../models/Budget");
const Transactions = require("../models/Transactions");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getAiInsight = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch and sanitize data
        const rawData = await Budget.find({ user: userId }).lean();
        const transaction = await Transactions.find({ user: userId }).lean();
        const inputData = rawData.map((b) => ({
            name: b.name,
            budget: b.limit,
            spent: b.spent,
            category: b.category,
        }));
        const transactionData = transaction.map((t) => ({
            type: t.type,
            category: t.category,
            amount: t.amount,
            discription: t.discription,
            paymentMethod: t.paymentMethod,
        }));

        const prompt = `
You are an expert financial analysis assistant.

Your task is to analyze a user's budget data and transaction history, then generate a structured financial summary with meaningful insights and practical advice.

Strictly follow these instructions:

1. Budget Analysis:

   * Calculate total budget by summing all budget categories.
   * Calculate total spent by summing all transactions.
   * Calculate percent_used as:
     (total_spent / total_budget) * 100
   * Round percentages to 2 decimal places.

2. Category Analysis:
   For each budget category:

   * Match transactions to the correct category.
   * Calculate total spent in that category.
   * Calculate percentage spent:
     (spent / budget) * 100
   * Round percentages to 2 decimal places.
   * If no transactions exist for a category, spent = 0 and percent = 0.

3. Financial Advice Logic:
   Generate advice based on actual spending behavior:

   Good:

   * Add 2–3 positive observations.
   * Examples:

     * Staying under budget in important categories
     * Consistent savings behavior
     * Controlled discretionary spending

   Tip:

   * Provide ONE personalized, actionable tip.
   * Focus on the category with the highest overspending or most wasteful spending pattern.
   * Mention the category explicitly.
   * Be specific and practical.

   Next Month:

   * Provide ONE forward-looking recommendation.
   * Suggest budget adjustments or spending improvements based on trends.

4. Rules:

   * Base all advice strictly on the provided data.
   * Do NOT invent categories or transactions.
   * Do NOT provide generic financial advice.
   * If spending exceeds budget, explicitly mention it.
   * Detect recurring subscriptions or unusually frequent spending if visible.
   * Keep advice practical and easy to understand.

5. Output Rules:

   * Return ONLY valid JSON.
   * Do NOT include markdown.
   * Do NOT include explanations.
   * Ensure all numbers are valid numeric values (not strings).
   * Ensure arrays are always present (empty if no advice).

Return JSON in this exact schema:

{
"summary": {
"total_budget": number,
"total_spent": number,
"percent_used": number
},
"categories": [
{
"name": string,
"budget": number,
"spent": number,
"percent": number
}
],
"advice": {
"good": [string],
"tip": string,
"next_month": string
}
}

Data to analyze:

Budget Data:
${JSON.stringify(inputData)}

Transaction Data:
${JSON.stringify(transactionData)}

`;

        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful financial assistant. Respond ONLY in JSON as described.",
                },
                { role: "user", content: prompt },
            ],
            temperature: 0,
        });

        const insight = response.choices[0].message.content;
        res.json(JSON.parse(insight));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAiTip = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const transaction = await Transactions.find({ user: userId }).lean();
        const transactionData = transaction.map((t) => ({
            type: t.type,
            category: t.category,
            amount: t.amount,
            discription: t.discription,
            paymentMethod: t.paymentMethod,
        }));

        const prompt = `
You are an expert personal finance assistant.

Your task is to analyze a user's transaction history and generate ONE personalized, actionable financial tip based on their spending behavior, income patterns, and transaction trends.

Instructions:

1.Analyze the transaction data carefully:
    -Identify spending categories (food, shopping, bills, transport, entertainment, etc.)
    -Detect unusual spending patterns
    -Identify recurring expenses/subscriptions
    -Detect income consistency and savings behavior
    -Identify high-frequency small expenses that accumulate over time
    -Detect cash flow issues (expenses close to or exceeding income)
2.Generate a tip that is:
    -Personalized to the user's actual transaction behavior
    -Specific and actionable (not generic)
    -Practical and realistic
    -Clear and easy to understand
    -Helpful for improving savings, budgeting, or reducing unnecessary expenses
3.Prioritize high-impact advice:
    -Reduce unnecessary recurring expenses
    -Improve budgeting habits
    -Increase savings opportunities
    -Control overspending categories
    -Improve emergency fund planning
    -Optimize bill payments or debt management
4.Rules:
    -Do NOT give generic advice unless transaction data strongly supports it
    -Mention relevant categories or patterns from the data
    -Focus on the single most impactful insight
    -Keep the tip concise but meaningful (max 80 words)
    -Avoid financial jargon unless necessary

Return ONLY valid JSON in this exact schema:
{
"tip": "your personalized financial tip"
}

Data to analyze:

Transaction Data:
${JSON.stringify(transactionData)}

`;
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful financial assistant. Respond ONLY in JSON as described.",
                },
                { role: "user", content: prompt },
            ],
            temperature: 0,
        });

        const insight = response.choices[0].message.content;
        res.json(JSON.parse(insight));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
