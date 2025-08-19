import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/SupabaseAuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";

function App() {
  return <HomePage />;
}

export default App;
