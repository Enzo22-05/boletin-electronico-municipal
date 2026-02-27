import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { DocumentsProvider } from "./context/DocumentsContext";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Ordenanzas from "./pages/Ordenanzas";
import Decretos from "./pages/Decretos";
import Resoluciones from "./pages/Resoluciones";
import Licitaciones from "./pages/Licitaciones";
import Contacto from "./pages/Contacto";
import Legislacion from "./pages/Legislacion";
import AdminLogin from "./pages/AdminLogin";
import AdminSubir from "./pages/AdminSubir";
import EjecucionPresupuestaria from "./pages/EjecucionPresupuestaria";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-800">
      <TopBar />
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto w-full px-4 py-5 flex gap-5 items-start flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0">
        <Routes>
  <Route path="/" element={<Inicio />} />
  <Route path="/ordenanzas" element={<Ordenanzas />} />
  <Route path="/decretos" element={<Decretos />} />
  <Route path="/resoluciones" element={<Resoluciones />} />
  <Route path="/licitaciones" element={<Licitaciones />} />
  <Route path="/ejecucion-presupuestaria" element={<EjecucionPresupuestaria />} />
  <Route path="/legislacion" element={<Legislacion />} />
  <Route path="/contacto" element={<Contacto />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/subir" element={<AdminSubir />} />
</Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <DocumentsProvider>
          <Layout />
        </DocumentsProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}
