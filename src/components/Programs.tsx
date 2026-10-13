
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookOpen, Users, Award } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      icon: Heart,
      title: "Health Sector",
      subtitle: "Children Cancer Care",
      description: "Providing financial assistance, emotional support, and access to medical treatment for children battling cancer from low-income backgrounds.",
      features: [
        "Chemo Care Bags for essential support",
        "Partnership with hospitals and medical professionals",
        "Emotional support for families"
      ]
    },
    {
      icon: BookOpen,
      title: "Education Sector",
      subtitle: "Coming Soon",
      description: "We provide free training to educators in underprivileged schools, enhancing their teaching skills and knowledge.",
      features: [
        "Free teacher trainings",
        "Student mentorship programs",
        "Educational resource support"
      ]
    },
    {
      icon: Users,
      title: "Family Upliftment Sector",
      subtitle: "White Collar Family Support",
      description: "Providing grocery support to white-collar families facing financial difficulties due to unforeseen circumstances.",
      features: [
        "Grocery drives and support",
        "Counseling and skill-building workshops",
        "Empowerment programs for self-sufficiency"
      ]
    }
  ];

  const achievements = [
    {
      title: "Project C³ (Chemo Care Companion)",
      description: "Our Chemo Care Bag Workshop and Distribution provided essential support to 60 children battling cancer at the NICH Hospital, Karachi.",
      impact: "60 children supported"
    },
    {
      title: "Project H² (Helping Hands)",
      description: "Our Silent Grocery Distribution initiative has discreetly supported ten white-collar families in local area, ensuring dignity and respect by maintaining their anonymity.",
      impact: "10 families helped"
    }
  ];

  return (
    <section id="programs" className="py-20 bg-foundation-light">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Programs Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foundation-green mb-6">
            Our Programs
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We focus on three critical areas to make a meaningful impact in our community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {programs.map((program, index) => (
            <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-foundation-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-foundation-green">
                  {program.title}
                </CardTitle>
                <p className="text-sm text-gray-600 font-medium">{program.subtitle}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-foundation-green rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foundation-green mb-4">
              Our Achievements
            </h3>
            <p className="text-lg text-gray-700">
              We're proud to highlight two significant initiatives since our birth in January 2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-foundation-gradient rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foundation-green mb-2">
                        {achievement.title}
                      </h4>
                      <span className="inline-block bg-green-100 text-foundation-green text-sm px-3 py-1 rounded-full">
                        {achievement.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
