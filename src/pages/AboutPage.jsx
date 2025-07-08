import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  Users,
  Shield,
  Search,
  Download,
  Filter,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutPage = () => {
  const objectives = [
    {
      icon: BookOpen,
      title: "Organized Access",
      description:
        "Provide organized access to exam questions for better academic preparation",
    },
    {
      icon: Search,
      title: "Smart Search & Filter",
      description:
        "Enable search and filter by course, level, session, or department",
    },
    {
      icon: Download,
      title: "PDF Preview & Download",
      description:
        "Support PDF preview and download functionality for easy access",
    },
    {
      icon: Shield,
      title: "Reduce Unofficial Sources",
      description: "Reduce reliance on printed and unofficial sources",
    },
    {
      icon: Target,
      title: "Centralized Materials",
      description: "Improve academic preparation with centralized materials",
    },
  ];

  const features = [
    "Secure student authentication system",
    "Advanced search and filtering capabilities",
    "Mobile-responsive design for all devices",
    "High-quality PDF viewing and downloading",
    "Usage analytics and download tracking",
    "Department-based organization",
    "Session and semester filtering",
    "Real-time search results",
  ];

  return (
    <>
      <Helmet>
        <title>About - Question Bank</title>
        <meta
          name="description"
          content="Learn about Question Bank - an online past question bank with search and filter functionality for university students."
        />
      </Helmet>

      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-mouau-green mb-4">
              About Question Bank
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Revolutionizing how students access and prepare with past
              examination questions
            </p>
          </motion.div>

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <BookOpen className="w-6 h-6" />
                  <span>Project Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  This platform provides a centralized{" "}
                  <strong>Online Past Question Bank</strong> with search and
                  filter functionality. Students can find questions by course,
                  department, level, session, and semester with download
                  support.
                </p>
                <p className="text-gray-700 mt-4">
                  By removing dependency on fragmented resources, we provide a
                  unified and structured repository for academic readiness.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-mouau-green mb-4">
                Key Project Objectives
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                We focus on five key pillars that enhance institutional value
                and student success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectives.map((obj, index) => (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="academic-card hover:shadow-xl transition hover:-translate-y-1">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <obj.icon className="w-8 h-8 text-mouau-green" />
                      </div>
                      <CardTitle className="text-lg">{obj.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">
                        {obj.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-mouau-green mb-6">
                  Platform Features
                </h2>
                <p className="text-gray-700 mb-8">
                  A robust and modern platform tailored for academic performance
                  and scalability.
                </p>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-mouau-green" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  className="rounded-2xl shadow-2xl"
                  alt="Students using Question Bank"
                  src="https://images.unsplash.com/photo-1547253113-7ed8c1f3b9ed"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-mouau-yellow rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-mouau-green rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </motion.div>

          {/* Technical Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <Target className="w-6 h-6" />
                  <span>Technical Implementation</span>
                </CardTitle>
                <CardDescription>
                  Built using industry-grade technology stack for performance
                  and maintainability.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <ul className="space-y-1">
                    <li>• React 18</li>
                    <li>• Tailwind CSS</li>
                    <li>• Framer Motion</li>
                    <li>• React Router</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <ul className="space-y-1">
                    <li>• Supabase (Auth + DB)</li>
                    <li>• Storage for PDFs</li>
                    <li>• Real-time updates</li>
                    <li>• Analytics engine</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <Users className="w-6 h-6" />
                  <span>Impact & Benefits</span>
                </CardTitle>
                <CardDescription>
                  Real academic value for students, institutions, and educators.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-mouau-green" />
                  </div>
                  <h3 className="font-semibold text-mouau-green mb-1">
                    For Students
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Organized access to real past questions and improved exam
                    outcomes
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-mouau-green" />
                  </div>
                  <h3 className="font-semibold text-mouau-green mb-1">
                    For Institutions
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Institutional visibility, performance tracking, and resource
                    control
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-mouau-green" />
                  </div>
                  <h3 className="font-semibold text-mouau-green mb-1">
                    For Education
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Advancing digitization of educational resources and academic
                    integrity
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
