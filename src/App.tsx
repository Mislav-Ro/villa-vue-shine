import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VillaEsquel from "./pages/VillaEsquel";
import VillaOlivenbaum from "./pages/VillaOlivenbaum";
import AlidaValli from "./pages/AlidaValli";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VillaEsquel />} />
          <Route path="/villa-esquel" element={<VillaEsquel />} />
          <Route path="/villa-olivenbaum" element={<VillaOlivenbaum />} />
          <Route path="/alida-valli" element={<AlidaValli />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
