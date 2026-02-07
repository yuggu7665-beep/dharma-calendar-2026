
import { PanchangData, ChatMessage } from "../types";

// LongCat API configuration - OpenAI compatible format
const LONGCAT_BASE_URL = "https://api.longcat.chat/openai/v1";
// Using the key from env or fallback for build safety
const LONGCAT_API_KEY = process.env.LONGCAT_API_KEY || "ak_2Dp0mF5mT5Vp4YQ0Zh5vD6mA9HU9L";

export async function fetchPanchangData(date: Date): Promise<PanchangData> {
  try {
    const prompt = `Aaj ki date ${date.toLocaleDateString('hi-IN')} ke liye Hindu Panchang details batao in JSON format:
    {
      "tithi": "tithi ka naam",
      "nakshatra": "nakshatra ka naam", 
      "yoga": "yoga ka naam",
      "karana": "karana ka naam",
      "sunrise": "sunrise time",
      "sunset": "sunset time"
    }`;

    const response = await fetch(`${LONGCAT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LONGCAT_API_KEY}`
      },
      body: JSON.stringify({
        model: "LongCat-Flash-Chat",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
       console.error("LongCat API Error:", response.status, await response.text());
       throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (content) {
      return JSON.parse(content);
    }
    throw new Error("No content in response");

  } catch (error) {
    console.error("Panchang fetch error:", error);
    return {
      tithi: "Shukla Paksha (Offline)",
      nakshatra: "Unavailable",
      yoga: "Unavailable",
      karana: "Unavailable",
      sunrise: "06:00 AM",
      sunset: "06:00 PM"
    };
  }
}

export async function getSpiritualGuidance(userMessage: string, history: ChatMessage[]): Promise<string> {
  try {
    const messages = history.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.text
    }));
    
    // Add current message
    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(`${LONGCAT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LONGCAT_API_KEY}`
      },
      body: JSON.stringify({
        model: "LongCat-Flash-Thinking-2601",
        messages: messages
      })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Maaf kijiye, main abhi sampark nahi kar pa raha hu.";

  } catch (error) {
    console.error("Chat error:", error);
    return "Maaf kijiye, abhi kuch technical issue hai. Thodi der baad try karein.";
  }
}
