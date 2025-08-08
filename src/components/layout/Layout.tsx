import { type ReactNode } from "react";
import { Header, Footer } from "../index";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
