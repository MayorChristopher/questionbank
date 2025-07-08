import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, BookOpen, Clock, Loader2, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";

const MyDownloadsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDownloads = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("downloads_log")
      .select(
        "id, downloaded_at, past_questions ( id, course_code, course_title, file_path )"
      )
      .eq("user_id", user.id)
      .order("downloaded_at", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching downloads",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setDownloads(data);
    }
    setLoading(false);
  }, [user, toast]);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  return (
    <>
      <Helmet>
        <title>My Downloads - Question Bank</title>
        <meta
          name="description"
          content="View your download history on Question Bank."
        />
      </Helmet>
      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-mouau-green">
                  My Downloads
                </h1>
                <p className="text-gray-700">
                  A history of all the questions you've downloaded.
                </p>
              </div>
              <Link to="/dashboard">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="academic-card border-mouau-green">
              <CardHeader>
                <CardTitle className="flex items-center text-mouau-green">
                  <Download className="w-6 h-6 mr-3" /> Download History
                </CardTitle>
                <CardDescription className="text-gray-600">
                  You have downloaded {downloads.length} file
                  {downloads.length !== 1 ? "s" : ""}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-8 h-8 animate-spin text-mouau-green" />
                  </div>
                ) : downloads.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No downloads yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start by searching for questions.
                    </p>
                    <div className="mt-6">
                      <Link to="/search">
                        <Button>Search Questions</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Downloaded At
                        </TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloads.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium text-mouau-green">
                              {item.past_questions.course_title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.past_questions.course_code}
                            </div>
                            <div className="sm:hidden text-xs text-gray-500 flex items-center mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(item.downloaded_at).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              {new Date(item.downloaded_at).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link to={`/document/${item.past_questions.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MyDownloadsPage;
