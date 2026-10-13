import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ItemDonationFormData {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  item_type: 'Hair Strands' | 'Homemade Snacks' | 'Stress Balls' | 'Hot/Cold Pack' | 'Sanitizers';
  quantity: number;
  description?: string;
  pickup_address: string;
  preferred_pickup_date?: string;
  notes?: string;
}

export const useCreateItemDonation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ItemDonationFormData) => {
      const { data: result, error } = await supabase
        .from('item_donations')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item-donations'] });
      toast({
        title: "Donation Submitted Successfully!",
        description: "Thank you for your generous contribution. We'll contact you soon regarding pickup.",
      });
    },
    onError: (error) => {
      console.error('Item donation error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your donation. Please try again.",
        variant: "destructive",
      });
    },
  });
};