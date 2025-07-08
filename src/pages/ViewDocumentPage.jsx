import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  ArrowLeft,
  Share2,
  Calendar,
  GraduationCap,
  Building,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import ShareModal from "@/components/ShareModal";

const ViewDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const isUUID = (id) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );

  const fetchDocument = useCallback(async () => {
    if (!isUUID(id)) {
      toast({
        title: "Invalid ID",
        description: "The document ID is not valid.",
        variant: "destructive",
      });
      navigate("/search");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("past_questions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({
        title: "Error fetching document",
        description: error?.message || "Document not found.",
        variant: "destructive",
      });
      navigate("/search");
    } else {
      setDocument(data);
    }

    setLoading(false);
  }, [id, toast, navigate]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  const handleDownload = async () => {
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
      .getPublicUrl(document.file_path);

    window.open(data.publicUrl, "_blank");

    await supabase.from("downloads_log").insert({
      user_id: user.id,
      file_path: document.file_path,
      question_id: document.id,
    });
  };

  const handleShare = () => {
    const { data } = supabase.storage
      .from("past-questions")
      .getPublicUrl(document.file_path);

    setDocument((prev) => ({ ...prev, publicUrl: data.publicUrl }));
    setShareModalOpen(true);
  };

  const getPublicUrl = (filePath) => {
    if (!filePath) return "";
    const { data } = supabase.storage
      .from("past-questions")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-mouau-light flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-mouau-green" />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-mouau-light flex items-center justify-center p-4">
        <Card className="academic-card max-w-md mx-auto text-center bg-white">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold">Document Not Found</h2>
            <Button
              onClick={() => navigate("/search")}
              className="mt-4 bg-mouau-green hover:bg-mouau-darkGreen text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{document.course_title} - Question Bank</title>
        <meta
          name="description"
          content={`View and download ${document.course_title} past question.`}
        />
      </Helmet>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        document={document}
      />

      <div className="min-h-screen bg-mouau-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-mouau-green hover:text-mouau-darkGreen"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="academic-card sticky top-24 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-mouau-green">
                    {document.course_title}
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-mouau-darkGreen">
                    {document.course_code}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium">{document.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="font-medium">{document.level} Level</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Session & Semester
                        </p>
                        <p className="font-medium">
                          {document.session} • {document.semester}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-mouau-green hover:bg-mouau-darkGreen text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-mouau-green text-mouau-green hover:bg-mouau-light"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Document Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="academic-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-mouau-green">
                    <Eye className="w-6 h-6" />
                    <span>Document Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-mouau-light rounded-lg min-h-[60vh] sm:min-h-[80vh]">
                    <iframe
                      src={getPublicUrl(document.file_path)}
                      width="100%"
                      className="border-none rounded-lg h-[60vh] sm:h-[80vh]"
                      title={document.course_title}
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDocumentPage;
