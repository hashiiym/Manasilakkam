import { SYSTEM_PROMPT } from '../src/utils/geminiPrompt.js';

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

    let safeQuery = query;
    // If the frontend asks for a Surah but forgets to specify a verse chunk, force it.
    if (!safeQuery.toLowerCase().includes('verse')) {
      safeQuery = `${safeQuery}, focus ONLY on verses 1 to 6`;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      return new Response(JSON.stringify({ error: true, message: 'Groq API key not configured correctly' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Search Query: ${safeQuery}` }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 3500
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
      return new Response(JSON.stringify({ error: true, type: 'network', message: `Groq API error: ${status} - ${errText}` }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    
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

    // Handle graceful error format from prompt rules
    if (parsed.error === 'not_quran') {
      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: true, type: 'unknown', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
