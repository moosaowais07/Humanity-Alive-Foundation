import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const url = new URL(req.url)
    const transactionId = url.searchParams.get('transactionId')
    const easypaisaRef = url.searchParams.get('paymentToken')
    const status = url.searchParams.get('status')

    console.log('Verifying payment:', { transactionId, easypaisaRef, status })

    if (!transactionId) {
      throw new Error('Transaction ID is required')
    }

    // Update donation status based on EasyPaisa response
    const paymentStatus = status === 'success' ? 'completed' : 'failed'

    const { data: donation, error: updateError } = await supabase
      .from('donations')
      .update({
        payment_status: paymentStatus,
        easypaisa_reference: easypaisaRef,
        updated_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId)
      .select()
      .single()

    if (updateError) {
      console.error('Database update error:', updateError)
      throw new Error('Failed to update donation status')
    }

    console.log('Payment verification completed:', donation)

    // Redirect based on payment status
    const redirectUrl = paymentStatus === 'completed'
      ? `${Deno.env.get('SITE_URL') || 'https://humanity-alive-foundation.vercel.app'}/thank-you`
      : `${Deno.env.get('SITE_URL') || 'https://humanity-alive-foundation.vercel.app'}/donation-cancelled`

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': redirectUrl
      }
    })

  } catch (error) {
    console.error('Error verifying payment:', error)
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': `${Deno.env.get('SITE_URL') || 'https://humanity-alive-foundation.vercel.app'}/donation-cancelled`
      }
    })
  }
})