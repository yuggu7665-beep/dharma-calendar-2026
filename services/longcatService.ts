
import { PanchangData, ChatMessage } from "../types";

// LongCat API configuration - OpenAI compatible format
const LONGCAT_BASE_URL = "https://api.longcat.chat/openai/v1";
// Using the key from env or fallback for build safety
const LONGCAT_API_KEY = import.meta.env.VITE_LONGCAT_API_KEY || "ak_2Dp0mF5mT5Vp4YQ0Zh5vD6mA9HU9L";

export async function fetchPanchangData(date: Date): Promise<PanchangData> {
  try {
    // Use free Panchang API for accurate astronomical calculations
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Using prokerala.com free Panchang API (no auth required for basic data)
    const response = await fetch(`https://api.prokerala.com/v2/astrology/panchang?ayanamsa=1&coordinates=28.6139,77.2090&datetime=${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T06:00:00&la=en`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Panchang API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract Panchang data from response
    const panchang = data.data;
    
    return {
      tithi: panchang.tithi?.name || "Unknown",
      nakshatra: panchang.nakshatra?.name || "Unknown",
      yoga: panchang.yoga?.name || "Unknown",
      karana: panchang.karana?.name || "Unknown",
      sunrise: panchang.sunrise || "06:00 AM",
      sunset: panchang.sunset || "06:00 PM"
    };

  } catch (error) {
    console.error("Panchang fetch error:", error);
    
    // Fallback: Try to get basic info from date
    const tithiNames = [
      "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
      "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
      "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"
    ];
    
    // Approximate tithi based on lunar day (rough calculation)
    const lunarDay = Math.floor((date.getDate() % 30) / 2);
    const paksha = date.getDate() < 15 ? "Shukla" : "Krishna";
    
    return {
      tithi: `${paksha} ${tithiNames[lunarDay] || "Paksha"}`,
      nakshatra: "Offline - Connect to internet",
      yoga: "Offline",
      karana: "Offline",
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
