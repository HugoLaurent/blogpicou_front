import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./Home/Home";
import Article from "./components/Article/Article";
import Articles from "./components/Articles/Articles";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voyages/:id" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </Layout>
    </Router>
  );
}
