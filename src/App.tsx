import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import { ScrollToTop } from "./components/ScrollToTop";

// Route-based code splitting: lazy-load non-critical pages
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
            <Route path="/" element={<Index />} />
            {/* Localized homepage (per language) */}
            <Route path="/de" element={<Index />} />
            <Route path="/de/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/en/" element={<Index />} />
            {/* Localized one-page sections — Index handles the scroll. */}
            <Route path="/de/ueber-mich" element={<Index />} />
            <Route path="/de/unterricht" element={<Index />} />
            <Route path="/de/kontakt" element={<Index />} />
            <Route path="/en/about-me" element={<Index />} />
            <Route path="/en/lessons" element={<Index />} />
            <Route path="/en/contact" element={<Index />} />
            {/* Portfolio routes */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:category" element={<Portfolio />} />
            <Route path="/en/portfolio" element={<Portfolio />} />
            <Route path="/de/portfolio" element={<Portfolio />} />
            <Route path="/en/portfolio/:category" element={<Portfolio />} />
            <Route path="/de/portfolio/:category" element={<Portfolio />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/impressum" element={<Impressum />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
