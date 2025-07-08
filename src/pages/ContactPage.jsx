import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  HelpCircle,
  Loader2,
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
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("contact_messages")
      .insert([formData]);

    if (error) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message Received",
        description:
          "We've received your message. You'll hear from us shortly.",
      });
      setFormData({ name: "", email: "", message: "" });
    }
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Reach us via email anytime.",
      contact: "support@Question Bank.edu",
      color: "from-mouau-green to-mouau-lightGreen",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Available weekdays 9am – 4pm",
      contact: "+234 701 234 5678",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Campus Office",
      description: "Visit us at our student support center",
      contact: "Block B2, ICT Complex, MOUAU",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const faqs = [
    {
      question: "How do I find past questions?",
      answer:
        "Register or log in, then use the search bar to filter by course, level, or session.",
    },
    {
      question: "Are the materials official?",
      answer:
        "Yes. All documents are sourced from verified departmental archives.",
    },
    {
      question: "Can I access the questions offline?",
      answer: "Yes. Downloaded PDFs are accessible offline via your device.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Question Bank</title>
        <meta
          name="description"
          content="Reach out to Question Bank support or send us your feedback."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need help, support, or want to give feedback? We’d love to hear
              from you.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="academic-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-mouau-green" />
                    <span>Send a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Fill the form below and we’ll get back to you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="My Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Your Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-mouau-green"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Info & FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <Card className="academic-card">
                <CardHeader>
                  <CardTitle>Support Channels</CardTitle>
                  <CardDescription>
                    Connect with us through any of the options below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center`}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {info.description}
                        </p>
                        <p className="text-sm font-medium text-mouau-green">
                          {info.contact}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card className="academic-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <span>FAQs</span>
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to common queries.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="border-b pb-4 last:border-none"
                    >
                      <h3 className="text-gray-900 font-medium">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
