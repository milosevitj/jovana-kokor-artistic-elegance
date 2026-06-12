
-- Drop admin/roles system
DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP TABLE IF EXISTS public.user_roles;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP TYPE IF EXISTS public.app_role;

-- Simplify newsletter_subscribers: drop extra columns, enforce unique email
ALTER TABLE public.newsletter_subscribers DROP COLUMN IF EXISTS updated_at;
ALTER TABLE public.newsletter_subscribers DROP COLUMN IF EXISTS status;
ALTER TABLE public.newsletter_subscribers DROP COLUMN IF EXISTS source;
ALTER TABLE public.newsletter_subscribers DROP COLUMN IF EXISTS language;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'newsletter_subscribers_email_key'
  ) THEN
    ALTER TABLE public.newsletter_subscribers
      ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);
  END IF;
END $$;

-- No public read; inserts handled by edge function with service role.
-- Keep RLS enabled with no policies (default deny).
