-- Create item_donations table for cashless donations (items/goods)
CREATE TABLE public.item_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('Hair Strands', 'Homemade Snacks', 'Stress Balls', 'Hot/Cold Pack', 'Sanitizers')),
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  description TEXT,
  pickup_address TEXT NOT NULL,
  preferred_pickup_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'collected', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.item_donations ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to view item donations (for transparency)
CREATE POLICY "Anyone can view item donations" 
  ON public.item_donations 
  FOR SELECT 
  USING (true);

-- Policy to allow inserting item donations
CREATE POLICY "Allow item donation insertions" 
  ON public.item_donations 
  FOR INSERT 
  WITH CHECK (true);

-- Policy to allow updating item donation status
CREATE POLICY "Allow item donation status updates" 
  ON public.item_donations 
  FOR UPDATE 
  USING (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_item_donations_updated_at 
  BEFORE UPDATE ON public.item_donations 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();