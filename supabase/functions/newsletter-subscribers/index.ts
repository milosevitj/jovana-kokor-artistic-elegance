import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'GET') return json({ error: 'Method not allowed' }, 405);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace('Bearer ', '');
  const { data: claimsData, error: claimsErr } = await userClient.auth.getClaims(token);
  if (claimsErr || !claimsData?.claims?.sub) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceKey);
  const { data: isAdmin, error: roleErr } = await admin.rpc('has_role', {
    _user_id: claimsData.claims.sub,
    _role: 'admin',
  });

  if (roleErr || !isAdmin) {
    return json({ error: 'Forbidden' }, 403);
  }

  const { data, error } = await admin
    .from('newsletter_subscribers')
    .select('id, email, status, source, language, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return json({ error: 'Server error' }, 500);
  }

  return json({ subscribers: data ?? [] }, 200);
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
