const dotenv = require("dotenv");
const Groq = require("groq-sdk");
const Budget = require("../models/Budget");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getAiInsight = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch and sanitize data
        const rawData = await Budget.find({ user: userId }).lean();
        const inputData = rawData.map((b) => ({
            name: b.name,
            budget: b.limit,
            spent: b.spent,
            category: b.category,
        }));

        const prompt = `
You are a financial assistant.
Return ONLY valid JSON in this exact schema:

{
  "summary": {
    "total_budget": number,
    "total_spent": number,
    "percent_used": number
  },
  "categories": [
    {"name": string, "budget": number, "spent": number, "percent": number}
  ],
  "advice": {
    "good": [string],
    "tip": string,
    "next_month": string
  }
}

For each category, calculate the percentage spent.
Include advice based on spending.
Here is the data to analyze:
${JSON.stringify(inputData)}
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
