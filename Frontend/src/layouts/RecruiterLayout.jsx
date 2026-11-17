import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar";

const RecruiterLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <RecruiterNavbar />

        {/* Page Content */}
        
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default RecruiterLayout;