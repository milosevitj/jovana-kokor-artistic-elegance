import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ success: false, message: 'Method not allowed' }, 405);

  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email ?? '').toString().trim().toLowerCase();

    if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
      return json({ success: false, message: 'Invalid email address' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { error } = await supabase.from('newsletter_subscribers').insert({ email });

    if (error) {
      if ((error as any).code === '23505') {
        return json({ success: false, message: 'Email already subscribed' }, 409);
      }
      throw error;
    }

    return json({ success: true, message: 'Successfully subscribed' }, 200);
  } catch (err) {
    console.error('newsletter-subscribe error:', err);
    return json({ success: false, message: 'Server error' }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
