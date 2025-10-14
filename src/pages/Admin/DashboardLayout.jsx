import AdminSidebar from './AdminSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      
      <AdminSidebar /> 

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {children} 
        </main>
      </div>
    </div>
  );
};