import fetch from "node-fetch";

export default async function handler(req, res) {
  const userMessage = req.query.msg || "Dimmi qualcosa Maestro.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sei Il Maestro, anti-streamer comico, passivo-aggressivo di Warzone." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({ reply: data.choices?.[0]?.message?.content || "Errore AI." });
}

