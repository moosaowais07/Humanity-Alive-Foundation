
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src="/uploads/79864f53-971d-4217-af73-c45b7e056963.png"
              alt="Humanity Alive Foundation Logo"
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Making a Difference Together</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Humanity Alive
            </span>
            <br />
            <span className="text-foreground">Foundation</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Spreading kindness, compassion, and hope throughout our community.
            Join us in making a meaningful impact on the lives of those who need it most.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Link to="/donate">
                <Heart className="w-5 h-5 mr-2" />
                Make a Donation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold hover:bg-primary/10 border-2 transition-all duration-300 hover:scale-105"
            >
              <Link to="/programs">
                <Users className="w-5 h-5 mr-2" />
                View Our Programs
              </Link>
            </Button>
          </div>

          {/* Stats or trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Lives Touched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Volunteers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">₨2M+</div>
              <div className="text-sm text-muted-foreground">Donations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">Programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
