import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSideBar } from "@/modules/dashboard/ui/components/Dashboard-SideBar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/DashboardNavbar";
interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
