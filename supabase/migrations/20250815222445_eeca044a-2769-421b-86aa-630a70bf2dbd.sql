-- Create user profiles table for admin management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT role = 'admin' FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (public.is_admin(auth.uid()));

-- Drop existing permissive policies on donations table
DROP POLICY IF EXISTS "Anyone can view donations" ON public.donations;

-- Create new restrictive policies for donations
CREATE POLICY "Admins can view all donations"
ON public.donations
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can access donations"
ON public.donations
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Drop existing permissive policies on item_donations table  
DROP POLICY IF EXISTS "Anyone can view item donations" ON public.item_donations;

-- Create new restrictive policies for item_donations
CREATE POLICY "Admins can view all item donations"
ON public.item_donations
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can access item donations"
ON public.item_donations
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a default admin user (you'll need to update this with actual admin email)
INSERT INTO public.profiles (user_id, email, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000000', 
  'admin@humanityalive.org', 
  'Admin User', 
  'admin'
) ON CONFLICT (user_id) DO NOTHING;