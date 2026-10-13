
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, CreditCard, Gift, Users, Home, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProcessEasypaisaPayment } from "@/hooks/useMonetaryDonations";
import ItemDonationForm from "./ItemDonationForm";

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [category, setCategory] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { toast } = useToast();
  const easypaisaPayment = useProcessEasypaisaPayment();

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const donationCategories = [
    {
      value: "children-cancer",
      label: "Children Battling Cancer",
      icon: Heart,
      description: "Support children undergoing cancer treatment with essential care items and emotional support"
    },
    {
      value: "white-collar",
      label: "White Collar Support", 
      icon: Users,
      description: "Help families facing financial hardship with grocery drives and fee assistance"
    },
    {
      value: "elderly-care",
      label: "Elderly Care & Support",
      icon: Home,
      description: "Provide nutritional support and care for elderly community members"
    }
  ];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const handleDonate = () => {
    const finalAmount = customAmount || amount;
    if (!finalAmount || !category || !donorInfo.name || !donorInfo.email || !donorInfo.phone) {
      toast({
        title: "Information Required",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (parseInt(finalAmount) < 500) {
      toast({
        title: "Minimum Amount",
        description: "Minimum donation amount is PKR 500.",
        variant: "destructive"
      });
      return;
    }

    const donationData = {
      donor_name: donorInfo.name,
      donor_email: donorInfo.email,
      donor_phone: donorInfo.phone,
      amount: parseInt(finalAmount),
      category,
      payment_method: 'easypaisa' as const
    };

    toast({
      title: "Redirecting to EasyPaisa",
      description: "Please wait while we redirect you to the payment gateway.",
    });
    easypaisaPayment.mutate(donationData);
  };

  const selectedCategory = donationCategories.find(cat => cat.value === category);

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Make a Donation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your contribution helps us continue our mission of spreading kindness and compassion throughout our community
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="monetary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
              <TabsTrigger value="monetary" className="flex items-center gap-3 text-base">
                <Wallet className="w-5 h-5" />
                Monetary Donation
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center gap-3 text-base">
                <Gift className="w-5 h-5" />
                Cashless Donation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monetary">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-card via-card to-primary/5">
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Secure Online Donation
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Choose an amount and help us make a meaningful difference in someone's life
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-8 p-8">
                  {/* Amount Selection */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <Label className="text-xl font-bold text-primary mb-4 block">Select Donation Amount (PKR)</Label>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {predefinedAmounts.map((preset) => (
                        <Button
                          key={preset}
                          variant={amount === preset.toString() ? "default" : "outline"}
                          onClick={() => handleAmountSelect(preset)}
                          className="h-14 text-lg font-semibold transition-all duration-300 hover:scale-105"
                          size="lg"
                        >
                          ₨{preset.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <Label htmlFor="custom-amount" className="text-base font-medium">Custom Amount (Min: ₨500)</Label>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="Enter your desired amount"
                        value={customAmount}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        min="500"
                        className="mt-2 h-12 text-lg text-center"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-4">
                    <Label htmlFor="category" className="text-xl font-bold text-primary">Choose Your Impact Area *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-14 text-base">
                        <SelectValue placeholder="Select where you'd like to make a difference" />
                      </SelectTrigger>
                      <SelectContent>
                        {donationCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value} className="py-4">
                            <div className="flex items-center gap-3">
                              <cat.icon className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium">{cat.label}</div>
                                <div className="text-sm text-muted-foreground">{cat.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-primary text-center">Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="mt-2 h-12"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="mt-2 h-12"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="mt-2 h-12"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button 
                      onClick={handleDonate} 
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-lg" 
                      size="lg"
                      disabled={easypaisaPayment.isPending}
                    >
                      {easypaisaPayment.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-6 h-6 mr-3" />
                          Donate Now - ₨{(customAmount || amount || '0').toLocaleString()}
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-muted-foreground">
                        🔒 Secure payment powered by EasyPaisa
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items">
              <ItemDonationForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Donate;
