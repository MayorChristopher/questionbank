import React from "react";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Download, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find past questions instantly with our intelligent search system",
    },
    {
      icon: Filter,
      title: "Advanced Filters",
      description: "Filter by course, department, level, session, and semester",
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download or preview questions in high-quality PDF format",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description:
        "Student authentication ensures secure and authorized access",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Question Bank - Access Past Questions Instantly</title>
        <meta
          name="description"
          content="A centralized past question archive with search, filter, and download options for university students."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-mouau-lightGreen py-20 lg:py-32">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 text-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Access Past Questions
                  <span className="block text-mouau-green">Instantly</span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                  A centralized past question archive with search, filter, and
                  download options. Prepare for your exams with confidence using
                  our comprehensive database.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="/register">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-mouau-green hover:bg-green-700 text-white"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                  <a href="/search">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow hover:text-black"
                    >
                      Browse Questions
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Placeholder for image or illustration */}
                <div className="w-72 h-72 bg-mouau-yellow rounded-full opacity-10 blur-3xl absolute -top-4 -right-4"></div>
                <div className="w-72 h-72 bg-mouau-green rounded-full opacity-10 blur-3xl absolute -bottom-4 -left-4"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Question Bank?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is designed to make accessing past questions
                simple, secure, and efficient
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="academic-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-mouau-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-mouau-lightYellow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Excel in Your Studies?
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Join thousands of students who have improved their academic
                performance with Question Bank
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-mouau-green hover:bg-green-700 text-white"
                  >
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow hover:text-black"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
