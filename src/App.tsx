import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import ProtectedHomePage from "./pages/ProtectedHomePage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<LoginPage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/protected-home" element={<ProtectedHomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
