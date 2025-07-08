import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Download,
  TrendingUp,
  Clock,
  Users,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const role = user?.profile?.role;
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleViewDownloads = () => {
    navigate("/dashboard/downloads");
  };

  const [quickStats, setQuickStats] = useState([
    { title: "Available Questions", value: "-", icon: BookOpen },
    { title: "Your Downloads", value: "-", icon: Download },
    { title: "Recent Views", value: "-", icon: Clock },
    { title: "Active Students", value: "-", icon: Users },
  ]);
  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    const fetchStatsAndRecent = async () => {
      // Available Questions
      const { count: questionsCount } = await supabase
        .from("past_questions")
        .select("id", { count: "exact", head: true });

      // User Downloads
      let downloadsCount = "-";
      if (user) {
        const { count: userDownloads } = await supabase
          .from("downloads_log")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);
        downloadsCount = userDownloads ?? "-";
      }

      // Recent Views (could be downloads for now)
      let recentViews = "-";
      if (user) {
        const { count: recent } = await supabase
          .from("downloads_log")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte(
            "downloaded_at",
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          );
        recentViews = recent ?? "-";
      }

      // Active Students (users with an account)
      const { count: activeStudentsCount } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      setQuickStats([
        {
          title: "Available Questions",
          value: questionsCount ?? "-",
          icon: BookOpen,
        },
        { title: "Your Downloads", value: downloadsCount, icon: Download },
        { title: "Recent Views", value: recentViews, icon: Clock },
        {
          title: "Active Students",
          value: activeStudentsCount ?? "-",
          icon: Users,
        },
      ]);

      // Recent Questions
      const { data, error } = await supabase
        .from("past_questions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      if (!error) setRecentQuestions(data);
    };
    if (user) fetchStatsAndRecent();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-mouau-lightGreen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-mouau-yellow rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-mouau-green" />
          </div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userEmail = user?.email || "Student";
  const userName = user?.user_metadata?.name || userEmail.split("@")[0];

  return (
    <>
      <Helmet>
        <title>Dashboard - Question Bank</title>
        <meta
          name="description"
          content="Your Question Bank dashboard with access to past questions and study materials."
        />
      </Helmet>

      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-mouau-green mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-gray-700">
              Ready to access past questions and boost your academic
              performance?
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <Search className="w-6 h-6" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Start exploring past questions with these quick actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/search">
                    <Button
                      className="w-full h-16 text-left justify-start"
                      variant="outline"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-mouau-yellow/30 rounded-lg flex items-center justify-center">
                          <Search className="w-5 h-5 text-mouau-green" />
                        </div>
                        <div>
                          <div className="font-medium">Search Questions</div>
                          <div className="text-sm text-gray-500">
                            Find past questions
                          </div>
                        </div>
                      </div>
                    </Button>
                  </Link>

                  <Link to="/departments">
                    <Button
                      className="w-full h-16 text-left justify-start"
                      variant="outline"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-mouau-yellow/30 rounded-lg flex items-center justify-center">
                          <Filter className="w-5 h-5 text-mouau-green" />
                        </div>
                        <div>
                          <div className="font-medium">Browse Departments</div>
                          <div className="text-sm text-gray-500">
                            Filter by department
                          </div>
                        </div>
                      </div>
                    </Button>
                  </Link>

                  <Button
                    onClick={handleViewDownloads}
                    className="w-full h-16 text-left justify-start"
                    variant="outline"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-mouau-yellow/30 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-mouau-green" />
                      </div>
                      <div>
                        <div className="font-medium">My Downloads</div>
                        <div className="text-sm text-gray-500">
                          View downloaded files
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <Card className="academic-card border-red-300 bg-white">
                <CardHeader>
                  <CardTitle className="text-mouau-green">
                    Admin Panel
                  </CardTitle>
                  <CardDescription>
                    You have admin privileges. Manage uploads and moderate
                    content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Link to="/admin/upload">
                      <Button className="bg-mouau-green text-white hover:bg-[#256029]">
                        Upload Questions
                      </Button>
                    </Link>
                    {/* You can add more admin tools here later */}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {quickStats.map((stat, index) => (
              <Card
                key={stat.title}
                className="academic-card border-mouau-green"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-mouau-green">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-mouau-yellow rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-mouau-green" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Most Downloaded Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <TrendingUp className="w-6 h-6" />
                  <span>Most Downloaded Questions</span>
                </CardTitle>
                <CardDescription>
                  Popular past questions that students are accessing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuestions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white border border-mouau-yellow/40 rounded-lg hover:bg-mouau-yellow/10 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-mouau-yellow/30 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-mouau-green" />
                        </div>
                        <div>
                          <h3 className="font-medium text-mouau-green">
                            {question.course_title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {question.course_code} • {question.session} •{" "}
                            {question.semester} Semester
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-mouau-green">
                            —
                          </p>
                          <p className="text-xs text-gray-500">This week</p>
                        </div>
                        <a
                          href={
                            supabase.storage
                              .from("past-questions")
                              .getPublicUrl(question.file_path).data.publicUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-mouau-green text-white hover:bg-mouau-green/90"
                          >
                            View
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/search">
                    <Button
                      variant="outline"
                      className="border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow/10"
                    >
                      View All Questions
                      <Search className="ml-2 w-4 h-4" />
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

export default DashboardPage;
