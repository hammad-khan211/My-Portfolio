const Groq = require("groq-sdk");

exports.handler = async function (event) {
  try {

    const body = JSON.parse(event.body || "{}");
    const message = body.message || "Hello";

    const knowledge = `
Ahmad Hammad Khan is an IT Engineering student and software developer from India.

Education:
- B.Tech in Information Technology

Core Skills:
- Java
- Data Structures and Algorithms
- Object-Oriented Programming
- HTML
- CSS
- JavaScript
- React
- Node.js
- MongoDB
- Git and GitHub

Programming Focus:
Ahmad primarily uses Java for practicing Data Structures and Algorithms and solving coding problems on platforms like LeetCode.

Projects:

1. Hotel Gate Tracker Website
A web-based system designed to track entries and exits at a hotel gate.  
It helps manage visitor movement efficiently and maintain records.

Technologies used:
- HTML
- CSS
- JavaScript

2. Iron Paradise Gym Workout Website
A gym-themed website that provides workout plans, fitness information, and gym-related content.

Features:
- Workout plan sections
- Informational fitness content
- Modern responsive design

Technologies used:
- HTML
- CSS
- JavaScript

3. AI Powered Portfolio Website
Ahmad's personal portfolio website that includes an AI assistant capable of answering questions about his skills, projects, and experience.

Features:
- AI chatbot assistant
- Interactive UI
- Dark and light theme toggle
- Animated design

Technologies used:
- HTML
- CSS
- JavaScript
- Netlify Functions
- Groq AI API

4. New Kashmir Footwear Shop Website
A website built for a footwear shop to showcase products and provide business information online.

Features:
- Product display
- Shop information
- Responsive layout

Technologies used:
- HTML
- CSS
- JavaScript

5. Professional Freelance Portfolio Website
A portfolio website designed to showcase freelance work, projects, and professional skills.

Features:
- Project showcase
- Clean professional layout
- Responsive design

Technologies used:
- HTML
- CSS
- JavaScript

Career Goals:
Ahmad aims to become a skilled software engineer with strong expertise in Data Structures, Algorithms, and modern web development.

He is actively improving his problem-solving skills and building real-world projects.

LeetCode Practice:
Ahmad regularly practices coding problems on LeetCode to strengthen his algorithmic thinking and prepare for technical interviews.
`;
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 120,
      messages: [
        {
          role: "system",
          content: `You are the AI assistant for Ahmad Hammad Khan's portfolio website.
          Your job is to help visitors understand Ahmad's skills, projects, and background.

Rules:
- Answer clearly and professionally.
- Keep answers SHORT (2–4 sentences max).
- If listing projects, mention them briefly in bullet points.
- Do not write long paragraphs.
- Only use the information provided below.
- If a question is unrelated to Ahmad, politely say you can only answer questions about Ahmad.

Portfolio Knowledge:
${knowledge}`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: completion.choices[0].message.content
      })
    };

  } catch (error) {

    console.error("Chatbot error:", error);

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Sorry, the AI assistant is temporarily unavailable."
      })
    };
  }
};