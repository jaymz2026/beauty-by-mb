-- 1. Create Profiles table
-- 1. Create Base Tables
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  purchase_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  date DATE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create a helper function to check admin status without recursion
-- SECURITY DEFINER allows the function to bypass RLS and check the table directly
CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create RLS Policies for Profiles
-- Policy 1: Everyone can see their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy 2: Admins can view all profiles (using the helper function to avoid recursion)
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.check_is_admin());

-- 5. Secure Products table
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins with MFA can manage products" ON public.products
  FOR ALL TO authenticated
  USING (
    (auth.jwt() ->> 'aal') = 'aal2'
    AND public.check_is_admin()
  );

-- 6. Secure Categories table
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins with MFA can manage categories" ON public.categories
  FOR ALL TO authenticated
  USING (
    (auth.jwt() ->> 'aal') = 'aal2'
    AND public.check_is_admin()
  );

-- 7. Secure Journal Posts table
CREATE POLICY "Anyone can view journal posts" ON public.journal_posts
  FOR SELECT USING (true);

CREATE POLICY "Admins with MFA can manage journal posts" ON public.journal_posts
  FOR ALL TO authenticated
  USING (
    (auth.jwt() ->> 'aal') = 'aal2'
    AND public.check_is_admin()
  );

-- 8. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, is_admin)
  VALUES (new.id, false)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger (drop first to avoid duplicates)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- INSTRUCTIONS:
-- 1. Run this script in the Supabase SQL Editor.
-- 2. To promote yourself to admin, find your User ID in the Auth section and run:
--    UPDATE public.profiles SET is_admin = true WHERE id = 'YOUR_USER_ID';
