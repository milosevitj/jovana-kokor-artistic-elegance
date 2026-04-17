import { useEffect, useState } from 'react';
import { Instagram, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const INSTAGRAM_URL = 'https://www.instagram.com/joywannasworld/';

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

type FeedState =
  | { status: 'loading' }
  | { status: 'success'; posts: InstagramPost[] }
  | { status: 'error' };

export function InstagramLiveFeed() {
  const [state, setState] = useState<FeedState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('instagram-feed');
        if (cancelled) return;
        if (error || !data?.posts) {
          setState({ status: 'error' });
          return;
        }
        setState({ status: 'success', posts: data.posts as InstagramPost[] });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- Loading ----------
  if (state.status === 'loading') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md bg-muted animate-pulse flex items-center justify-center"
          >
            <Loader2 className="w-6 h-6 text-muted-foreground/40 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  // ---------- Error / Fallback ----------
  if (state.status === 'error' || state.posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-md border border-border/50 bg-card/30">
        <Instagram className="w-12 h-12 text-primary mb-4" />
        <h3 className="font-serif text-2xl mb-2">Live feed unavailable</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Catch the latest moments directly on Instagram.
        </p>
        <Button
          asChild
          size="lg"
          className="gap-3 font-sans tracking-wide"
        >
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5" />
            Follow @JoyWanna on Instagram
          </a>
        </Button>
      </div>
    );
  }

  // ---------- Success ----------
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {state.posts.map((post) => {
        const imageSrc =
          post.media_type === 'VIDEO' && post.thumbnail_url
            ? post.thumbnail_url
            : post.media_url;
        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-md bg-muted border border-border/40"
            aria-label="JoyWanna's world on Instagram"
          >
            <img
              src={imageSrc}
              alt="JoyWanna's world on Instagram"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Instagram className="w-8 h-8 text-primary" />
              <span className="font-sans text-sm tracking-wide text-foreground">
                View on Instagram
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
