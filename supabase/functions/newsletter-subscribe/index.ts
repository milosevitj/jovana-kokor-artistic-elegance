const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RECIPIENT_EMAIL = 'contact@joywanna.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email ?? '').toString().trim().toLowerCase();

    if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
      return json({ success: false, message: 'Invalid email address' }, 400);
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'JoyWanna Website <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          subject: `[Newsletter Signup] ${email}`,
          html: `<h2>New Newsletter Signup</h2><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><em>Submitted via the website newsletter form.</em></p>`,
          reply_to: email,
        }),
      });
      if (!res.ok) {
        console.error('Resend error:', await res.text());
        throw new Error(`Email send failed: ${res.status}`);
      }
    } else {
      console.log('Newsletter signup (no email service configured):', { email, recipient: RECIPIENT_EMAIL });
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
