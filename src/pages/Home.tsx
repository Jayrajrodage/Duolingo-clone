import { Footer } from "@/components/Marketing/Footer";
import { Header } from "@/components/Marketing/Header";
import { MainContent } from "@/components/Marketing/MainContent";

import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center">
        <MainContent />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
