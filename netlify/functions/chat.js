const Groq = require("groq-sdk");
const fs = require("fs");
const path = require("path");

exports.handler = async function(event){

try {

const body = JSON.parse(event.body || "{}");
const message = body.message || "Hello";

const knowledge = fs.readFileSync(
path.join(__dirname,"portfolio-data.txt"),
"utf8"
);

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY
});

const completion = await groq.chat.completions.create({
model: "llama-3.1-8b-instant",
messages: [
{
role:"system",
content: `
You are the AI assistant for Ahmad Hammad Khan's portfolio.

Answer questions about Ahmad clearly and professionally.

Only use the information below.

If a question is unrelated to Ahmad or his work, politely say that you can only answer questions about his portfolio.

Portfolio information:
${knowledge}
`
},
{
role:"user",
content: message
}
]
});

return {
statusCode:200,
body: JSON.stringify({
reply: completion.choices[0].message.content
})
};

} catch(error){

console.error("Chatbot error:",error);

return {
statusCode:500,
body: JSON.stringify({
reply:"AI assistant temporarily unavailable."
})
};

}

};