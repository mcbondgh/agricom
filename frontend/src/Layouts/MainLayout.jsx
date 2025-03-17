import { Outlet } from "react-router-dom";
import { NavbarComponent } from "@/components/layoutComponents/Navbar";
import { SidebarComponent } from "@/components/layoutComponents/Sidebar";
import { useState } from "react";
const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSideMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    };
  return (
  <div className="flex flex-col h-screen">
    <NavbarComponent handleSideMenuTriggerOnMobile = {handleSideMenuToggle} />
    <div className="flex flex-1 overflow-hidden bg-gray-100">
      <SidebarComponent sidebarOpenState = {sidebarOpen} />
      <main className="md:ml-16 flex-1 overflow-y-auto p-3 bg-white shadow-md">
        <Outlet />
      </main>
    </div>
  </div>
  )
};

export default MainLayout;
