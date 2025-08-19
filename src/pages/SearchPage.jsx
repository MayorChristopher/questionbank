import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  BookOpen,
  Calendar,
  GraduationCap,
  Building,
  Share2,
  Loader2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import ShareModal from "@/components/ShareModal";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    level: "",
    session: "",
    semester: "",
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const departments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Economics",
    "Business Administration",
  ];
  const levels = ["100", "200", "300", "400", "500"];
  const sessions = ["2023/2024", "2022/2023", "2021/2022", "2020/2021"];
  const semesters = ["First", "Second"];

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("past_questions").select("*");
    if (searchQuery) {
      query = query.or(
        `course_title.ilike.%${searchQuery}%,course_code.ilike.%${searchQuery}%`
      );
    }
    if (filters.department) query = query.eq("department", filters.department);
    if (filters.level) query = query.eq("level", filters.level);
    if (filters.session) query = query.eq("session", filters.session);
    if (filters.semester) query = query.eq("semester", filters.semester);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      toast({
        title: "Error fetching questions",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setQuestions(data);
    }
    setLoading(false);
  }, [searchQuery, filters, toast]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({ department: "", level: "", session: "", semester: "" });
  };

  const handleDownload = async (question) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to download.",
        variant: "destructive",
      });
      return;
    }
    const { data } = supabase.storage
      .from("past-questions")
      .getPublicUrl(question.file_path);
    window.open(data.publicUrl, "_blank");

    await supabase
      .from("downloads_log")
      .insert({ user_id: user.id, file_path: question.file_path });
  };

  const handleShare = (question) => {
    const { data } = supabase.storage
      .from("past-questions")
      .getPublicUrl(question.file_path);
    setSelectedDocument({
      title: question.course_title,
      publicUrl: data.publicUrl,
    });
    setShareModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Search Past Questions - Question Bank</title>
        <meta
          name="description"
          content="Search and filter past questions by course, department, level, session, and semester."
        />
      </Helmet>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        document={selectedDocument}
      />

      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-mouau-green mb-4">
              Search Past Questions
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find the exact past questions you need.
            </p>
          </motion.div>

          {/* Search Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-mouau-green">
                  <Search className="w-6 h-6 text-mouau-yellow" />
                  <span>Search & Filter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-mouau-green" />
                  <Input
                    placeholder="Search by Course Title or Code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-mouau-green focus:ring-mouau-yellow"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Select
                    value={filters.department}
                    onValueChange={(v) =>
                      setFilters({ ...filters, department: v })
                    }
                  >
                    <SelectTrigger className="border-mouau-green text-mouau-green">
                      <Building className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.level}
                    onValueChange={(v) => setFilters({ ...filters, level: v })}
                  >
                    <SelectTrigger className="border-mouau-green text-mouau-green">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l} Level
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.session}
                    onValueChange={(v) =>
                      setFilters({ ...filters, session: v })
                    }
                  >
                    <SelectTrigger className="border-mouau-green text-mouau-green">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Session" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.semester}
                    onValueChange={(v) =>
                      setFilters({ ...filters, semester: v })
                    }
                  >
                    <SelectTrigger className="border-mouau-green text-mouau-green">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s} Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-mouau-green mb-6">
              Search Results ({questions.length})
            </h2>

            {loading ? (
              <div className="text-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-mouau-green" />
              </div>
            ) : questions.length === 0 ? (
              <Card className="academic-card text-center py-12 border-mouau-green">
                <CardContent>
                  <BookOpen className="w-16 h-16 text-mouau-yellow mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-mouau-green">
                    No questions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions.map((q, i) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="academic-card h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-mouau-green">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-mouau-yellow rounded-lg flex items-center justify-center mb-3">
                            <BookOpen className="w-6 h-6 text-mouau-green" />
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-mouau-green">
                              {q.course_code}
                            </div>
                            <div className="text-xs text-gray-500">
                              {q.level} Level
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-mouau-green">
                          {q.course_title}
                        </CardTitle>
                        <CardDescription>
                          {q.department} • {q.session} • {q.semester}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-end">
                        <div className="flex space-x-2 mt-4">
                          <a href={`/document/${q.id}`} className="flex-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-mouau-yellow text-mouau-yellow hover:bg-mouau-yellow/10"
                            >
                              <Eye className="w-4 h-4 mr-2" /> View
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            className="flex-1 bg-mouau-green hover:bg-mouau-green/90 text-white"
                            onClick={() => handleDownload(q)}
                          >
                            <Download className="w-4 h-4 mr-2" /> Download
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(q)}
                            className="text-mouau-green hover:bg-mouau-green/10"
                          >
                            <Share2 className="w-4 h-4 mr-2" /> Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
