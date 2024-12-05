import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { sanitizeHtml } from 'https://esm.sh/sanitize-html@2.11.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Rate limiting map (in memory for demo, use Redis/DB in production)
const rateLimitMap = new Map();

const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(clientId) || [];
  
  // Clean up old requests
  const recentRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientId, recentRequests);
  return false;
}

function sanitizeInput(data: any): any {
  if (typeof data === 'string') {
    return sanitizeHtml(data, {
      allowedTags: [], // Strip all HTML
      allowedAttributes: {},
    });
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return data;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = req.headers.get('x-client-info') || req.headers.get('cf-connecting-ip') || 'unknown';
    
    // Check rate limit
    if (isRateLimited(clientId)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests' }),
        { 
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse and sanitize the request body
    const rawData = await req.json();
    const sanitizedData = sanitizeInput(rawData);

    // Process the sanitized data
    // Add your form processing logic here
    console.log('Processing sanitized data:', sanitizedData);

    return new Response(
      JSON.stringify({ success: true, data: sanitizedData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing form:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});