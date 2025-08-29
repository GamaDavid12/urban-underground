import NavigationButtons from '../components/NavigationButtons/NavigationButtons.jsx';

function MainLayout({ children }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center w-full box-border">
        {children}
      </main>
      <NavigationButtons />
    </div>
  );
}

export default MainLayout;