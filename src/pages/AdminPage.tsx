import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { AuthButton } from "@/components/auth/AuthButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { DollarSign, Package, Users, AlertCircle } from "lucide-react";

interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  category: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  transaction_id?: string;
}

interface ItemDonation {
  id: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  item_type: string;
  quantity: number;
  description?: string;
  pickup_address: string;
  preferred_pickup_date?: string;
  status: string;
  created_at: string;
  notes?: string;
}

const AdminPage = () => {
  const { user, profile, loading, isAdmin } = useAuthUser();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [itemDonations, setItemDonations] = useState<ItemDonation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchDonations();
      fetchItemDonations();
    }
  }, [isAdmin]);

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchItemDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('item_donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItemDonations(data || []);
      setLoadingData(false);
    } catch (error) {
      console.error('Error fetching item donations:', error);
      setLoadingData(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <AuthButton />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You do not have admin privileges to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const totalDonations = donations.reduce((sum, donation) => sum + Number(donation.amount), 0);
  const completedDonations = donations.filter(d => d.payment_status === 'completed').length;
  const pendingItemDonations = itemDonations.filter(d => d.status === 'pending').length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage donations and monitor foundation activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">PKR {totalDonations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                From {donations.length} donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedDonations}</div>
              <p className="text-xs text-muted-foreground">
                Successful transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Item Donations</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itemDonations.length}</div>
              <p className="text-xs text-muted-foreground">
                Total item submissions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingItemDonations}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting collection
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="monetary" className="w-full">
          <TabsList>
            <TabsTrigger value="monetary">Monetary Donations</TabsTrigger>
            <TabsTrigger value="items">Item Donations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monetary">
            <Card>
              <CardHeader>
                <CardTitle>Monetary Donations</CardTitle>
                <CardDescription>
                  All monetary donation records and payment statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-4">Loading donations...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{donation.donor_name}</div>
                              <div className="text-sm text-muted-foreground">
                                {donation.donor_email}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {donation.donor_phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            PKR {Number(donation.amount).toLocaleString()}
                          </TableCell>
                          <TableCell>{donation.category}</TableCell>
                          <TableCell className="capitalize">
                            {donation.payment_method.replace('_', ' ')}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                donation.payment_status === 'completed' ? 'default' :
                                donation.payment_status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {donation.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(donation.created_at), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Item Donations</CardTitle>
                <CardDescription>
                  All item donation requests and pickup information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="text-center py-4">Loading item donations...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Pickup Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{donation.donor_name}</div>
                              <div className="text-sm text-muted-foreground">
                                {donation.donor_email}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {donation.donor_phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{donation.item_type}</div>
                              {donation.description && (
                                <div className="text-sm text-muted-foreground">
                                  {donation.description}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{donation.quantity}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {donation.pickup_address}
                              {donation.preferred_pickup_date && (
                                <div className="text-muted-foreground">
                                  Preferred: {format(new Date(donation.preferred_pickup_date), 'MMM d, yyyy')}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                donation.status === 'completed' ? 'default' :
                                donation.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(donation.created_at), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <AuthButton />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;