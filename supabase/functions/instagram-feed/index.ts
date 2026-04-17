// Public edge function: fetches latest Instagram media via Graph API.
// The INSTAGRAM_ACCESS_TOKEN lives in backend secrets — never exposed to the browser.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'missing_token', message: 'INSTAGRAM_ACCESS_TOKEN not configured' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.facebook.com/v22.0/me/media?fields=${fields}&limit=6&access_token=${token}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('Instagram API error:', data);
      return new Response(
        JSON.stringify({
          error: 'instagram_api_error',
          message: data?.error?.message ?? 'Failed to fetch Instagram feed',
          code: data?.error?.code,
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const posts: InstagramMedia[] = (data.data ?? []).slice(0, 6);

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        // Cache for 10 minutes at the edge to limit Graph API calls
        'Cache-Control': 'public, max-age=600, s-maxage=600',
      },
    });
  } catch (err) {
    console.error('Edge function error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'server_error', message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
