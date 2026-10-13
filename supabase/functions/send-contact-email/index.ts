import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY2"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Send the contact message to the organization
    const messageEmailResponse = await resend.emails.send({
      from: "Humanity Alive <onboarding@resend.dev>",
      to: ["foundationhumanityalive@gmail.com"],
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">New Contact Message</h1>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Message:</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the Humanity Alive contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to the person who submitted the form
    const confirmationEmailResponse = await resend.emails.send({
      from: "Humanity Alive <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Humanity Alive!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Thank you for reaching out, ${name}!</h1>
          <p>We have received your message regarding: <strong>${subject}</strong></p>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your message:</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <p>We will get back to you within 24 hours at this email address: <strong>${email}</strong></p>
          <p>Thank you for your interest in supporting our mission.</p>
          <p>Best regards,<br>The Humanity Alive Team</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Humanity Alive Foundation<br>
            Karachi, Pakistan<br>
            foundationhumanityalive@gmail.com
          </p>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", { messageEmailResponse, confirmationEmailResponse });

    return new Response(JSON.stringify({ success: true, messageEmailResponse, confirmationEmailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);