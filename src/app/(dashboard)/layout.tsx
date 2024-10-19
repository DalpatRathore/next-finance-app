import WelcomeMessage from "@/components/WelcomeMessage";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col h-full items-center justify-center">
      <div className="flex items-center justify-center w-full p-2 md:p-5">
        <WelcomeMessage></WelcomeMessage>
      </div>
      {children}
    </section>
  );
};

export default DashboardLayout;
