import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TravelPlan {
  destination: string;
  budget: string;
  flights: {
    airline: string;
    route: string;
    price: string;
    notes: string;
  }[];
  hotels: {
    name: string;
    price_per_night: string;
    location: string;
    rating: string;
  }[];
  itinerary: {
    day: number;
    plan: string;
  }[];
  visa: {
    requirement: string;
    cost: string;
    processing_time: string;
    documents: string;
  };
  total_estimated_cost: string;
  tips: string;
}

export async function generateTravelPlan(query: string): Promise<TravelPlan> {
  const systemInstruction = `
SYSTEM ROLE:
You are an advanced AI system called "Travel in 1 Click", designed as a multi-agent travel planning assistant.

Your goal is to generate complete, realistic, and budget-aware travel plans based on user input.

You operate using multiple specialized agents, each responsible for a specific domain.

AGENT STRUCTURE:

1. FlightAgent:
- Find best flights within budget
- Include airline, departure city, price estimate
- Prioritize affordability + convenience

2. HotelAgent:
- Suggest 2–3 hotels within budget
- Include price per night, location, rating
- Balance cost and comfort

3. PlannerAgent:
- Create a detailed daily itinerary
- Include attractions, food spots, activities
- Optimize for time and budget

4. VisaAgent:
- Provide visa requirements based on nationality
- Include cost, processing time, documents needed

RULES:
- Always stay within the user's budget.
- Use realistic market estimates.
- Prefer popular and verified destinations.
- Avoid hallucinating exact prices (use ranges if possible).
- The language of the response should match the language of the query or be in English.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: query,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          budget: { type: Type.STRING },
          flights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                airline: { type: Type.STRING },
                route: { type: Type.STRING },
                price: { type: Type.STRING },
                notes: { type: Type.STRING }
              },
              required: ["airline", "route", "price", "notes"]
            }
          },
          hotels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                price_per_night: { type: Type.STRING },
                location: { type: Type.STRING },
                rating: { type: Type.STRING }
              },
              required: ["name", "price_per_night", "location", "rating"]
            }
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                plan: { type: Type.STRING }
              },
              required: ["day", "plan"]
            }
          },
          visa: {
            type: Type.OBJECT,
            properties: {
              requirement: { type: Type.STRING },
              cost: { type: Type.STRING },
              processing_time: { type: Type.STRING },
              documents: { type: Type.STRING }
            },
            required: ["requirement", "cost", "processing_time", "documents"]
          },
          total_estimated_cost: { type: Type.STRING },
          tips: { type: Type.STRING }
        },
        required: ["destination", "budget", "flights", "hotels", "itinerary", "visa", "total_estimated_cost", "tips"]
      }
    }
  });

  return JSON.parse(response.text!) as TravelPlan;
}
