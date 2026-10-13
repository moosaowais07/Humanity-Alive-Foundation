import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, CreditCard, Smartphone } from "lucide-react";
import { useProcessEasypaisaPayment } from "@/hooks/useMonetaryDonations";
import { useToast } from "@/hooks/use-toast";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DonationDialog = ({ open, onOpenChange }: DonationDialogProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");

  const processPayment = useProcessEasypaisaPayment();
  const { toast } = useToast();

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  
  const donationCategories = [
    { value: "general", label: "General Fund", icon: Heart },
    { value: "education", label: "Education Programs", icon: Heart },
    { value: "healthcare", label: "Healthcare Support", icon: Heart },
    { value: "emergency", label: "Emergency Relief", icon: Heart },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const handleDonate = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Category Required",
        description: "Please select a donation category.",
        variant: "destructive",
      });
      return;
    }

    if (!donorName || !donorEmail || !donorPhone) {
      toast({
        title: "Information Required",
        description: "Please fill in all your details.",
        variant: "destructive",
      });
      return;
    }

    const donationData = {
      donor_name: donorName,
      donor_email: donorEmail,
      donor_phone: donorPhone,
      amount: finalAmount,
      category,
      payment_method: 'easypaisa' as const,
    };

    processPayment.mutate(donationData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Make a Donation
          </DialogTitle>
          <DialogDescription>
            Your generous contribution helps us continue our mission to serve communities in need.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Select Amount (PKR)</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={selectedAmount === amount ? "bg-primary" : ""}
                    onClick={() => handleAmountSelect(amount)}
                  >
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                min="1"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Donation Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose where your donation will help most" />
                </SelectTrigger>
                <SelectContent>
                  {donationCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Payment Method Info */}
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="font-medium text-primary">Payment via EasyPaisa</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You'll be redirected to EasyPaisa's secure payment gateway to complete your donation.
              </p>
            </div>

            <Button 
              onClick={handleDonate} 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={processPayment.isPending}
            >
              {processPayment.isPending ? "Processing..." : `Donate PKR ${(customAmount ? parseFloat(customAmount) : selectedAmount)?.toLocaleString() || 0}`}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;