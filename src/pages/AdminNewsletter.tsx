import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Subscriber = {
  id: string;
  email: string;
  status: string;
  source: string | null;
  language: string | null;
  created_at: string;
};

export default function AdminNewsletter() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Newsletter Admin';
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    setLoading(true);
    setLoadError(null);
    supabase.functions
      .invoke('newsletter-subscribers', { method: 'GET' })
      .then(({ data, error }) => {
        if (error) {
          setLoadError(error.message || 'Failed to load subscribers');
          setSubscribers(null);
        } else {
          setSubscribers((data as { subscribers: Subscriber[] })?.subscribers ?? []);
        }
      })
      .finally(() => setLoading(false));
  }, [session]);

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setAuthBusy(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSubscribers(null);
  };

  const exportCsv = () => {
    if (!subscribers) return;
    const rows = [
      ['email', 'status', 'source', 'language', 'created_at'],
      ...subscribers.map((s) => [s.email, s.status, s.source ?? '', s.language ?? '', s.created_at]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background">
        <form onSubmit={signIn} className="w-full max-w-sm space-y-4 border border-border rounded-lg p-8">
          <h1 className="font-serif text-2xl">Admin sign in</h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <Button type="submit" disabled={authBusy} className="w-full">
            {authBusy ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl">Newsletter Subscribers</h1>
            <p className="text-sm text-muted-foreground">Signed in as {session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv} disabled={!subscribers?.length}>
              Export CSV
            </Button>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>

        {loading && <p className="text-muted-foreground">Loading…</p>}
        {loadError && (
          <p className="text-destructive">
            {loadError === 'Forbidden'
              ? 'Your account does not have admin access.'
              : loadError}
          </p>
        )}

        {subscribers && (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Lang</th>
                  <th className="p-3">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-muted-foreground">
                      No subscribers yet.
                    </td>
                  </tr>
                )}
                {subscribers.map((s) => (
                  <tr key={s.id} className="border-t border-border">
                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.status}</td>
                    <td className="p-3">{s.source ?? '—'}</td>
                    <td className="p-3">{s.language ?? '—'}</td>
                    <td className="p-3">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
