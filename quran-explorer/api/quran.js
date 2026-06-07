import { buildPrompt } from '../src/utils/geminiPrompt.js';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: true, message: 'Method not allowed' }), { 
      status: 405, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(JSON.stringify({ error: true, message: 'Query is required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      return new Response(JSON.stringify({ error: true, message: 'API key not configured correctly' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const contents = buildPrompt(query);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: true, type: 'rate_limit', message: 'Rate limit exceeded. Please wait a moment and try again.' }), { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
      return new Response(JSON.stringify({ error: true, type: 'network', message: `Gemini API error: ${status} - ${errText}` }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return new Response(JSON.stringify({ error: true, type: 'unknown', message: 'Invalid response from AI' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      const cleaned = text.replace(/^```json\n?|```$/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: true, type: 'unknown', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
