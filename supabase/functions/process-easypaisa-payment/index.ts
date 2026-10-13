import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DonationData {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  category: string;
  payment_method: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { donor_name, donor_email, donor_phone, amount, category }: DonationData = await req.json()

    console.log('Processing EasyPaisa payment for:', { donor_name, amount, category })

    // Generate unique transaction ID
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store donation in database with pending status
    const { data: donation, error: dbError } = await supabase
      .from('donations')
      .insert([{
        donor_name,
        donor_email,
        donor_phone,
        amount,
        category,
        payment_method: 'easypaisa',
        payment_status: 'pending',
        transaction_id: transactionId
      }])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store donation')
    }

    // For EasyPaisa integration, you would typically:
    // 1. Create payment request with EasyPaisa API
    // 2. Get payment URL from EasyPaisa
    // 3. Return the URL for redirection

    // Simulated EasyPaisa payment URL (replace with actual API call)
    const easypaisaPaymentUrl = `https://easypay.easypaisa.com.pk/easypay/Confirm.jsf?` +
      `storeId=YOUR_STORE_ID&` +
      `amount=${amount}&` +
      `orderRefNum=${transactionId}&` +
      `returnURL=${encodeURIComponent('https://yourapp.com/thank-you')}&` +
      `cancelURL=${encodeURIComponent('https://yourapp.com/donation-cancelled')}&` +
      `merchantHashedReq=HASHED_REQUEST`

    console.log('Generated payment URL for transaction:', transactionId)

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: easypaisaPaymentUrl,
        transactionId: transactionId,
        message: 'Payment URL generated successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error processing payment:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})