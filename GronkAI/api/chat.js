export default async function handler(req, res) {
  try {
    // Send the request to OpenAI with your hidden key
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GRONK_API_KEY}`  // uses the key from Vercel
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // small, cheap, fast model (you can upgrade later if needed)
        messages: req.body.messages  // passes messages from your index.html
      })
    });

    const data = await response.json();

    // Return the AI response back to your website
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong: " + error.message });
  }
}
