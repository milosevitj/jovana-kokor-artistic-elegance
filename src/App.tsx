import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { ScrollToTop } from "./components/ScrollToTop";

// Route-based code splitting: lazy-load non-critical pages
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const VocalCoaching = lazy(() => import("./pages/VocalCoaching"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Reimagined = lazy(() => import("./pages/Reimagined"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const AdminNewsletter = lazy(() => import("./pages/AdminNewsletter"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* Home (German default + English) */}
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/en/" element={<Index />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/en/contact" element={<Contact />} />

            {/* About Me */}
            <Route path="/ueber-mich" element={<About />} />
            <Route path="/en/about-me" element={<About />} />

            {/* Vocal Coaching */}
            <Route path="/vocal-coaching" element={<VocalCoaching />} />
            <Route path="/en/vocal-coaching" element={<VocalCoaching />} />

            {/* Projects */}
            <Route path="/projects" element={<Portfolio />} />
            <Route path="/projects/:category" element={<Portfolio />} />
            <Route path="/en/projects" element={<Portfolio />} />
            <Route path="/en/projects/:category" element={<Portfolio />} />

            {/* Album smart link */}
            <Route path="/reimagined" element={<Reimagined />} />
            <Route path="/en/reimagined" element={<Reimagined />} />

            {/* Legal */}
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Admin */}
            <Route path="/admin/newsletter" element={<AdminNewsletter />} />

            {/* Legacy redirects: /de/* → new clean paths */}
            <Route path="/de" element={<Navigate to="/" replace />} />
            <Route path="/de/" element={<Navigate to="/" replace />} />
            <Route path="/de/ueber-mich" element={<Navigate to="/ueber-mich" replace />} />
            <Route path="/about-me" element={<Navigate to="/en/about-me" replace />} />
            <Route path="/about" element={<Navigate to="/ueber-mich" replace />} />
            <Route path="/de/kontakt" element={<Navigate to="/contact" replace />} />
            <Route path="/de/vocal-coaching" element={<Navigate to="/vocal-coaching" replace />} />
            <Route path="/de/unterricht" element={<Navigate to="/vocal-coaching" replace />} />
            <Route path="/en/lessons" element={<Navigate to="/en/vocal-coaching" replace />} />
            <Route path="/de/projekte" element={<Navigate to="/projects" replace />} />
            <Route path="/de/projekte/:category" element={<Navigate to="/projects" replace />} />
            <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
            <Route path="/portfolio/:category" element={<Navigate to="/projects" replace />} />
            <Route path="/de/portfolio" element={<Navigate to="/projects" replace />} />
            <Route path="/en/portfolio" element={<Navigate to="/en/projects" replace />} />
            <Route path="/de/reimagined" element={<Navigate to="/reimagined" replace />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
