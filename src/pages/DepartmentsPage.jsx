import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Building, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/customSupabaseClient";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data, error } = await supabase
        .from("past_questions")
        .select("department");

      if (!error && data) {
        const unique = Array.from(new Set(data.map((d) => d.department)));
        setDepartments(unique.sort());
      }
      setLoading(false);
    };

    fetchDepartments();
  }, []);

  const departmentColors = [
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600", 
    "from-purple-500 to-purple-600",
    "from-red-500 to-red-600",
    "from-yellow-500 to-yellow-600",
    "from-indigo-500 to-indigo-600",
    "from-pink-500 to-pink-600",
    "from-teal-500 to-teal-600",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-mouau-lightGreen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building className="w-8 h-8 text-mouau-green" />
          </div>
          <p className="text-gray-600">Loading departments...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Departments - Question Bank</title>
        <meta
          name="description"
          content="Browse past questions by department. Find questions from Computer Science, Mathematics, Physics, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-mouau-lightGreen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-mouau-green mb-4">
              Browse by Department
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore past questions organized by academic departments. Find the
              resources you need for your specific field of study.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department, index) => (
              <motion.div
                key={department}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="academic-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${
                        departmentColors[index % departmentColors.length]
                      } rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-center text-mouau-green">
                      {department}
                    </CardTitle>
                    <CardDescription className="text-center">
                      Access past questions and study materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Students</span>
                      </div>
                    </div>
                    <a href={`/search?department=${encodeURIComponent(department)}`}>
                      <Button className="w-full bg-mouau-green hover:bg-mouau-darkGreen text-white">
                        Browse Questions
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {departments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Departments Found
              </h3>
              <p className="text-gray-500 mb-6">
                There are no departments with uploaded questions yet.
              </p>
              <div className="space-x-4">
                <a href="/contact">
                  <Button variant="outline" className="border-mouau-green text-mouau-green">
                    Contact Support
                  </Button>
                </a>
                <a href="/search">
                  <Button className="bg-mouau-green text-white">
                    Browse All Questions
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentsPage;