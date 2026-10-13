
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DonationCancelled = () => {
  return (
    <div className="min-h-screen bg-foundation-light flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <XCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-700 mb-4">
            Donation Cancelled
          </h1>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-600 mb-4">
              Your donation was cancelled and no payment was processed. 
              We understand that sometimes plans change.
            </p>
            <p className="text-foundation-green font-medium">
              💝 Your support means everything to us, whenever you're ready.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foundation-green mb-4">
              Would you like to try again?
            </h3>
            
            <div className="grid gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <Heart className="w-6 h-6 text-foundation-green mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Even the smallest contribution makes a meaningful impact in someone's life.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#donate">
                <Button className="bg-foundation-gradient hover:opacity-90">
                  <Heart className="w-4 h-4 mr-2" />
                  Try Donating Again
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 p-4 bg-foundation-light rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Need help or have questions?</strong><br />
              Contact us at info@humanityalive.org or +123-456-7890
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationCancelled;
