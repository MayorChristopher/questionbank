import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-mouau-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-mouau-yellow rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-mouau-green" />
              </div>
              <span className="text-xl font-bold text-white">
                Question Bank
              </span>
            </div>
            <p className="text-mouau-lightYellow mb-4 max-w-md">
              A centralized past question archive with search, filter, and
              download options. Helping students access academic materials
              efficiently and securely.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-mouau-lightYellow">
                <Mail className="w-4 h-4" />
                <span>support@Question Bank.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-semibold mb-4 block text-mouau-yellow">
              Quick Links
            </span>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-mouau-lightYellow hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block text-mouau-lightYellow hover:text-white transition-colors"
              >
                Search Questions
              </Link>
              <Link
                to="/departments"
                className="block text-mouau-lightYellow hover:text-white transition-colors"
              >
                Departments
              </Link>
              <Link
                to="/about"
                className="block text-mouau-lightYellow hover:text-white transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <span className="text-lg font-semibold mb-4 block text-mouau-yellow">
              Support
            </span>
            <div className="space-y-2">
              <Link
                to="/contact"
                className="block text-mouau-lightYellow hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <span className="block text-mouau-lightYellow cursor-pointer hover:text-white transition-colors">
                Terms of Service
              </span>
              <span className="block text-mouau-lightYellow cursor-pointer hover:text-white transition-colors">
                Privacy Policy
              </span>
              <span className="block text-mouau-lightYellow cursor-pointer hover:text-white transition-colors">
                FAQ
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-mouau-yellow/20 mt-8 pt-8 text-center">
          <p className="text-mouau-lightYellow text-sm">
            © 2025 Question Bank. All rights reserved. Built for academic
            excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
