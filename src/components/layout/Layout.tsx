import { type ReactNode } from "react";
import { Header, Footer } from "../index";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
