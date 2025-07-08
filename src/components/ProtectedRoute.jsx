import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const isAdmin = user?.profile?.role?.toLowerCase?.() === "admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-mouau-lightGreen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-mouau-green rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-mouau-lightGreen flex items-center justify-center">
        <Card className="academic-card max-w-md mx-auto text-center bg-white">
          <CardContent className="p-8">
            <BookOpen className="w-16 h-16 text-mouau-green mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You do not have permission to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
