import AdminSidebar from './AdminSidebar.jsx';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => { 
  return (
    <div className="flex min-h-screen w-full">
      
      <AdminSidebar /> 

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#010000] p-6 h-full">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;