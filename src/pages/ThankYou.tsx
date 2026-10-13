
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-foundation-light flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-foundation-green mb-4">
            Thank You for Your Donation!
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <Heart className="w-8 h-8 text-foundation-green mx-auto mb-3" />
            <p className="text-gray-700 mb-4">
              Your generous contribution will make a real difference in the lives of those we serve. 
              Every donation helps us continue our mission of creating positive change in our community.
            </p>
            <p className="text-foundation-green font-medium">
              📧 A detailed receipt has been sent to your email address.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foundation-green mb-4">
              What happens next?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-foundation-green mb-2">✅ Payment Processed</h4>
                <p className="text-sm text-gray-600">Your donation has been securely processed through PayPal.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-foundation-green mb-2">📧 Receipt Sent</h4>
                <p className="text-sm text-gray-600">Check your email for the official donation receipt.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-foundation-green mb-2">🎯 Funds Allocated</h4>
                <p className="text-sm text-gray-600">Your donation will be directed to the program you selected.</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-foundation-green mb-2">📊 Impact Updates</h4>
                <p className="text-sm text-gray-600">We'll keep you updated on how your donation is making a difference.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-gray-600">
              Want to stay connected with our work?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-foundation-gradient hover:opacity-90">
                  <Home className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
              </Link>
              
              <Link to="/#contact">
                <Button variant="outline" className="border-green-500 text-foundation-green hover:bg-green-50">
                  Stay in Touch
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-foundation-light rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Questions about your donation?</strong><br />
              Contact us at info@humanityalive.org or +123-456-7890
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
