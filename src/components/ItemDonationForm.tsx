import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateItemDonation, ItemDonationFormData } from "@/hooks/useItemDonations";
import { Gift, Package, Calendar, MapPin } from "lucide-react";

const ITEM_OPTIONS = [
  { value: 'Hair Strands', label: 'Hair Strands', icon: '💇‍♀️' },
  { value: 'Homemade Snacks', label: 'Homemade Snacks', icon: '🍪' },
  { value: 'Stress Balls', label: 'Stress Balls', icon: '⚽' },
  { value: 'Hot/Cold Pack', label: 'Hot/Cold Pack', icon: '🧊' },
  { value: 'Sanitizers', label: 'Sanitizers', icon: '🧴' }
] as const;

const ItemDonationForm = () => {
  const [formData, setFormData] = useState<ItemDonationFormData>({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    item_type: 'Hair Strands',
    quantity: 1,
    description: '',
    pickup_address: '',
    preferred_pickup_date: '',
    notes: ''
  });

  const createItemDonation = useCreateItemDonation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createItemDonation.mutate(formData);
  };

  const handleInputChange = (field: keyof ItemDonationFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto angled-card">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl">Cashless Donation</CardTitle>
        </div>
        <CardDescription>
          Donate items to help our cause. Your contribution makes a difference!
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5" />
              Your Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donor_name">Full Name *</Label>
                <Input
                  id="donor_name"
                  value={formData.donor_name}
                  onChange={(e) => handleInputChange('donor_name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="donor_phone">Phone Number *</Label>
                <Input
                  id="donor_phone"
                  type="tel"
                  value={formData.donor_phone}
                  onChange={(e) => handleInputChange('donor_phone', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="donor_email">Email Address *</Label>
              <Input
                id="donor_email"
                type="email"
                value={formData.donor_email}
                onChange={(e) => handleInputChange('donor_email', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Item Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item_type">Item Type *</Label>
                <Select 
                  value={formData.item_type} 
                  onValueChange={(value) => handleInputChange('item_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.icon}</span>
                          <span>{option.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide additional details about the item..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Pickup Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Pickup Details
            </h3>
            
            <div>
              <Label htmlFor="pickup_address">Pickup Address *</Label>
              <Textarea
                id="pickup_address"
                placeholder="Enter complete pickup address..."
                value={formData.pickup_address}
                onChange={(e) => handleInputChange('pickup_address', e.target.value)}
                required
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="preferred_pickup_date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Pickup Date (Optional)
              </Label>
              <Input
                id="preferred_pickup_date"
                type="date"
                value={formData.preferred_pickup_date}
                onChange={(e) => handleInputChange('preferred_pickup_date', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={createItemDonation.isPending}
          >
            {createItemDonation.isPending ? 'Submitting...' : 'Submit Donation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemDonationForm;