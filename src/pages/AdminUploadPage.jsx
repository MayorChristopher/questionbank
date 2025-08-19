import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

// Icons from Lucide
import {
  Upload,
  PlusCircle,
  BookOpen,
  Download,
  Trash2,
  Loader2,
} from "lucide-react";

// Supabase client
import { supabase } from "@/lib/customSupabaseClient";
import { uploadFileToStorage, downloadFile } from "@/lib/uploadUtils";

// Toast notification hook
import { useToast } from "@/components/ui/use-toast";

// UI components (modular, not barrel-imported)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const AdminUploadPage = () => {
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
    "Psychology",
    "English Literature",
    "History",
    "Political Science",
  ];

  const levels = ["100", "200", "300", "400", "500"];
  const semesters = ["First", "Second"];

  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    department: "",
    level: "",
    semester: "",
    session: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const MAX_FILE_SIZE_MB = 50;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Max allowed size is ${MAX_FILE_SIZE_MB}MB.`,
        variant: "destructive",
      });
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleDelete = async (file) => {
    try {
      await supabase.from("past_questions").delete().eq("id", file.id);
      toast({ title: "Deleted successfully" });
      fetchUploadedFiles();
    } catch (error) {
      toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file)
      return toast({ title: "No file selected", variant: "destructive" });

    setLoading(true);

    const filePath = `${formData.department}/${Date.now()}-${file.name}`;

    try {
      // Step 1: Upload file using utility function
      const { data, error: uploadError } = await uploadFileToStorage(file, filePath);

      if (uploadError) {
        throw new Error(uploadError.message || 'Upload failed');
      }

      // Step 2: Insert file metadata into the database
      const { error: insertError } = await supabase
        .from("past_questions")
        .insert([
          {
            ...formData,
            file_path: filePath,
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      toast({ title: "Upload successful!" });
      setFormData({
        course_code: "",
        course_title: "",
        department: "",
        level: "",
        semester: "",
        session: "",
      });
      setFile(null);
      fetchUploadedFiles();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const handleDownload = async (filePath) => {
    const result = await downloadFile(filePath);
    if (!result.success) {
      toast({
        title: "Download failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const fetchUploadedFiles = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("past_questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading files",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUploadedFiles(data);
    }

    setFetching(false);
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Upload - Question Bank</title>
        <meta
          name="description"
          content="Admin page to upload and manage past questions."
        />
      </Helmet>

      <div className="min-h-screen bg-mouau-lightGreen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-mouau-green mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Upload and manage past questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <Card className="academic-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-mouau-green">
                    <Upload className="w-6 h-6" />
                    <span>Upload New Question</span>
                  </CardTitle>
                  <CardDescription>
                    Fill the form to add a new past question.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      name="course_code"
                      placeholder="Course Code (e.g., CSC 301)"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      name="course_title"
                      placeholder="Course Title (e.g., Data Structures)"
                      onChange={handleChange}
                      required
                    />
                    <Select
                      onValueChange={(v) => handleSelectChange("department", v)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
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
                      onValueChange={(v) => handleSelectChange("level", v)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(v) => handleSelectChange("semester", v)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      name="session"
                      placeholder="Session (e.g., 2023/2024)"
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <Label htmlFor="file">Question Paper (PDF)</Label>
                      <Input
                        id="file"
                        name="file"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-mouau-green text-white hover:bg-[#256029]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add Question
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Uploaded Files Table */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="academic-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-mouau-green">
                    <BookOpen className="w-6 h-6" />
                    <span>Uploaded Documents</span>
                  </CardTitle>
                  <CardDescription>
                    Manage existing past questions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {fetching ? (
                    <div className="text-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-mouau-green" />
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Session</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {uploadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell>
                              {file.course_code}
                              <br />
                              <span className="text-xs text-gray-500">
                                {file.course_title}
                              </span>
                            </TableCell>
                            <TableCell>{file.session}</TableCell>
                            <TableCell className="space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDownload(file.file_path)}
                              >
                                <Download className="h-4 w-4 text-mouau-green" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDelete(file)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
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
      </div>
    </>
  );
};

export default AdminUploadPage;
