
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const impactAreas = [
    {
      icon: Heart,
      title: "Children Battling Cancer",
      description: "Supporting young warriors with care packages, emotional support, and essential items during their treatment journey.",
      color: "text-red-500"
    },
    {
      icon: Users,
      title: "White Collar Support",
      description: "Helping families facing financial hardship through grocery drives and fee assistance programs.",
      color: "text-blue-500"
    },
    {
      icon: Home,
      title: "Elderly Care",
      description: "Providing nutritional support and companionship to elderly community members who need our help.",
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Quick Impact Overview */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Impact Areas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every donation creates ripples of positive change in our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {impactAreas.map((area, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-primary/5">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <area.icon className={`w-8 h-8 ${area.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {area.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105">
                <Link to="/donate">
                  <Heart className="w-5 h-5 mr-2" />
                  Make a Donation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <p className="text-muted-foreground">
              Join hundreds of donors who are making a difference every day
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
