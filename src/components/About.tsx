
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Shield } from "lucide-react";

const About = () => {
  const coreValues = [
    {
      icon: Brain,
      title: "Autonomy",
      description: "Empowering individuals to take ownership and make informed decisions."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Cultivating compassion and understanding to build strong relationships."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Committing to transparency, honesty and ethics in every aspect of our work."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foundation-green mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The Humanity Alive Foundation (H.A.F) is dedicated to enhancing the lives of
            individuals and families in need by providing critical support in the areas
            of health, education, and family upliftment.
          </p>
          <div className="mt-8 p-6 bg-foundation-light rounded-lg max-w-4xl mx-auto">
            <p className="text-lg text-foundation-green font-medium">
              Our mission is to create a ripple effect of kindness and compassion,
              empowering those we serve to thrive and reach their full potential.
            </p>
          </div>
        </div>

        {/* Founder Story */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foundation-green mb-6">
                Our Foundation Story
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  This idea was instilled in our founder, <strong>Mrs. Alina Aziz</strong>,
                  by her mother, who taught her that the act of giving always brings inner peace.
                </p>
                <p>
                  Inspired by her mother's wisdom, Mrs. Aziz set out to create an organization
                  that would embody this principle and make a meaningful difference in the
                  lives of those in need.
                </p>
                <p className="text-foundation-green font-medium">
                  Since our birth in January 2025, we have been proud to make a significant
                  impact through our dedicated initiatives.
                </p>
              </div>
            </div>
            <div className="bg-foundation-light rounded-lg p-8">
              <blockquote className="text-lg italic text-foundation-green text-center">
                "The act of giving always brings inner peace."
              </blockquote>
              <p className="text-center mt-4 text-gray-600">
                - Wisdom passed to Mrs. Alina Aziz
              </p>
            </div>
          </div>
        </div>

        {/* Our Work in Action */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foundation-green mb-8 text-center">
            Our Work in Action
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/1849f836-8a53-44e2-99cb-fca568672009.png"
                alt="Healthcare outreach program"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/8fdb18e6-fd70-4da5-bb54-c1e7450e14c9.png"
                alt="Volunteer program and credentials"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/9f81a3fe-4c2a-4af9-83c2-c2f66b21cce0.png"
                alt="Essential supplies distribution"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/6c0f71ac-aabe-4e64-b1c0-c81ea8a6ef76.png"
                alt="Community aid packages"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/f057ce05-c036-4ef5-8722-899bfd123789.png"
                alt="Food and basic necessities distribution"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/0b48c3a8-7a83-46f2-99f0-772f945b53f3.png"
                alt="Medical care and treatment"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/37bcf103-5a3c-489a-96aa-409379cf0596.png"
                alt="Pediatric healthcare services"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/8c331349-b45e-4e6f-809a-0aae08b84ac8.png"
                alt="Community education and awareness"
                className="w-full h-64 object-contain"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gray-50">
              <img
                src="/uploads/6e98e2f5-6efb-4654-b0d6-b6b967fd9c92.png"
                alt="Professional medical training"
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Through our dedicated programs in healthcare, education, and community support,
            we're making a tangible difference in the lives of those who need it most.
            Our volunteers and partners work tirelessly to deliver essential services and hope to communities.
          </p>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-foundation-green mb-8 text-center">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-foundation-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foundation-green mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
