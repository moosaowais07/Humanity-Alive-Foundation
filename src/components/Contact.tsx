
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import DonationDialog from "./DonationDialog";

const Contact = () => {
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    navigate("/auth");
  };

  const handleDonationClick = () => {
    setIsDonationDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, email address, and message before sending.",
        variant: "destructive",
      });
      return;
    }

    // Check for @ symbol in email
    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid Email Format",
        description: "An @ symbol is required in the email address field.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send email using Supabase edge function
      const response = await fetch('https://tswopzusnqbyakkjkefv.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzd29wenVzbnFieWFra2prZWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzQ5ODgsImV4cCI6MjA2NTg1MDk4OH0.Agm59pr6JFeakBUjY8ha2At674tP9l91fXG2RWQHlh8`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Success message and reset form
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. A confirmation has been sent to your email address.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error Sending Message",
        description: "There was an issue sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-foundation-light">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foundation-green mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you want to volunteer, donate, 
            or learn more about our programs, we're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-foundation-green mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-foundation-gradient rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foundation-green mb-1">Phone</h4>
                      <p className="text-gray-700">+123-456-7890</p>
                      <p className="text-sm text-gray-600">Available Monday - Friday, 9 AM - 5 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-foundation-gradient rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foundation-green mb-1">Email</h4>
                      <p className="text-gray-700">foundationhumanityalive@gmail.com</p>
                      <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-foundation-gradient rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foundation-green mb-1">Office</h4>
                      <p className="text-gray-700">Karachi, Pakistan</p>
                      <p className="text-sm text-gray-600">Serving communities nationwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-foundation-green mb-8">
              Send us a Message
            </h3>
            
            <Card className="border-green-200">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <Input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                      <option value="Donation Questions">Donation Questions</option>
                      <option value="Partnership Proposal">Partnership Proposal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-foundation-gradient hover:opacity-90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8">
          <Heart className="w-16 h-16 text-foundation-green mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foundation-green mb-4">
            Join Our Mission
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Together, we can create a ripple effect of kindness and compassion. 
            Every action, no matter how small, contributes to positive change in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-foundation-gradient hover:opacity-90"
              onClick={handleVolunteerClick}
            >
              Become a Volunteer
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handleDonationClick}
            >
              Make a Donation
            </Button>
          </div>
        </div>
      </div>

      <DonationDialog 
        open={isDonationDialogOpen} 
        onOpenChange={setIsDonationDialogOpen} 
      />
    </section>
  );
};

export default Contact;
