import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface MonetaryDonationFormData {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  category: string;
  payment_method: 'easypaisa' | 'bank_transfer';
}

export interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  message?: string;
}

export const useCreateMonetaryDonation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MonetaryDonationFormData) => {
      const { data: result, error } = await supabase
        .from('donations')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    },
    onError: (error) => {
      console.error('Monetary donation error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your donation. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useProcessEasypaisaPayment = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MonetaryDonationFormData): Promise<PaymentResponse> => {
      const { data: result, error } = await supabase.functions.invoke('process-easypaisa-payment', {
        body: data
      });

      if (error) throw error;
      return result;
    },
    onSuccess: (data) => {
      if (data.success && data.paymentUrl) {
        // Redirect to EasyPaisa payment page
        window.location.href = data.paymentUrl;
      }
    },
    onError: (error) => {
      console.error('EasyPaisa payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    },
  });
};