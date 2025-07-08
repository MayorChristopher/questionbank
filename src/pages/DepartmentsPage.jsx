import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
      // Get all unique departments from past_questions
      const { data, error } = await supabase
        .from("past_questions")
        .select("department")
        .neq("department", "")
        .order("department", { ascending: true });
      if (!error && data) {
        // Remove duplicates
        const unique = Array.from(new Set(data.map((d) => d.department)));
        setDepartments(unique);
      }
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <Helmet>
        <title>Departments - Question Bank</title>
        <meta
          name="description"
          content="Browse past questions by department. Find questions from Computer Science, Mathematics, Physics, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-mouau-green mb-4">
              Browse by Department
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore past questions organized by academic departments. Click on
              any department to filter questions specific to that field of
              study.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="academic-card text-center border-mouau-green">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-mouau-green" />
                </div>
                <h3 className="text-2xl font-bold text-mouau-green mb-2">
                  {departments.length}
                </h3>
                <p className="text-gray-700">Departments</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Departments Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading ? (
              <div className="col-span-full text-center py-12 text-mouau-green text-xl">
                Loading departments...
              </div>
            ) : departments.length === 0 ? (
              <div className="col-span-full text-center py-12 text-mouau-green text-xl">
                No departments found.
              </div>
            ) : (
              departments.map((department, index) => (
                <motion.div
                  key={department}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="academic-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-mouau-green cursor-pointer group">
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg text-mouau-green group-hover:text-mouau-yellow transition-colors">
                        {department}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Link
                        to={`/search?department=${encodeURIComponent(
                          department
                        )}`}
                        className="block"
                      >
                        <Button className="w-full mt-4 bg-mouau-green hover:bg-mouau-green/90 text-white">
                          Browse Questions
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Card className="academic-card max-w-2xl mx-auto border-mouau-green">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-mouau-green mb-4">
                  Can't find your department?
                </h2>
                <p className="text-gray-700 mb-6">
                  We're constantly adding new departments and courses. Contact
                  us to request your specific department or course materials.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-mouau-green hover:bg-mouau-green/90 text-white"
                    >
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/search">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow/10"
                    >
                      Search All Questions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DepartmentsPage;
