import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import Purchase from "./pages/purchase/Purchase";
import Purchases from "./pages/purchases/Purchases";
import Admin from "./pages/admin/Admin";
import Bonuses from "./pages/bonuses/Bonuses";
import Faq from "./pages/faq/Faq";
// import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
// import NoPage from "./pages/NoPage";

export default function App() {
  const [token, setToken] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError(null)
      }, 5000)
  }, [error])

  useEffect(() => {
    // Загрузка токена из localStorage при загрузке компонента
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const parsedToken = JSON.parse(savedToken);
        setToken(parsedToken);
      } catch (e) {
        console.error("Failed to parse token:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Сохранение токена в localStorage при его изменении
    
    if (token) {
      try {
        const stringifiedToken = JSON.stringify(token);
        localStorage.setItem("token", stringifiedToken);
      } catch (e) {
        console.error("Failed to stringify token:", e);
      }
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout modal={modal} setModal={setModal} token={token} setToken={setToken} error={error} />}>
          <Route path="/" element={<Purchase token={token} setError={setError} setToken={setToken} />} />
          <Route path="purchases" element={<Purchases token={token} />} />
          <Route path="admin" element={<Admin setError={setError} />} />
          <Route path="bonuses" element={<Bonuses token={token} />} />
          <Route path="faq" element={<Faq />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
