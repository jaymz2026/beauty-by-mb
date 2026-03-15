-- 1. Create Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for Profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 4. Secure Products table with MFA requirement (AAL2)
-- Note: Replace existing policies or add these conditions
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins with MFA can manage products" ON public.products
  FOR ALL TO authenticated
  USING (
    (auth.jwt() ->> 'aal') = 'aal2'
    AND (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
  );

-- 5. Secure Categories table
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins with MFA can manage categories" ON public.categories
  FOR ALL TO authenticated
  USING (
    (auth.jwt() ->> 'aal') = 'aal2'
    AND (SELECT is_admin FROM public.profiles WHERE id = auth.uid()) = true
  );

-- 6. Trigger to create profile on signup (optional but recommended)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, is_admin)
  VALUES (new.id, false);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- INSTRUCTIONS:
-- After running this script, manually promote a user to admin:
-- UPDATE public.profiles SET is_admin = true WHERE id = 'YOUR_USER_ID';
