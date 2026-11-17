import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "../pages/Home";
import Register from "../pages/authPages/Register";
import CandidateDetails from "../pages/authPages/CandidateDetails";
import RecruiterDetails from "../pages/authPages/RecruiterDetails";
import Login from "../pages/authPages/Login";

import RecruiterDashboard from "../pages/recruiterPages/RecruiterDashboard";
import CompanyProfile from "../pages/recruiterPages/CompanyProfile";
import PostJob from "../pages/recruiterPages/PostJob";
import MyJobs from "../pages/recruiterPages/MyJobs";
import RecruiterJobDetails from "../pages/recruiterPages/RecruiterJobDetails";

import CandidateDashboard from "../pages/candidatePages/CandidateDashboard";
import CandidateLayout from "../layouts/CandidateLayout";
import CandidateProfile from "../pages/candidatePages/CandidateProfile";
import BrowseJobs from "../pages/candidatePages/BrowseJobs";
import CandidateJobDetails from "../pages/candidatePages/CandidateJobDetails";
import MyApplications from "../pages/candidatePages/MyApplications";
import JobApplicants from "../pages/recruiterPages/JobApplicants";

import ViewCandidateProfile from "../pages/recruiterPages/ViewCandidateProfile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/candidate-details"
        element={<CandidateDetails />}
      />
      <Route
        path="/recruiter-details"
        element={<RecruiterDetails />}
      />

      <Route path="/login" element={<Login />} />

      {/* <Route path="/candidate-dashboard" element=
        {
          <ProtectedRoutes role="candidate">
            <CandidateDashboard />
          </ProtectedRoutes>

        } /> */}


      <Route path="/recruiter-dashboard" element={
        <ProtectedRoutes role="recruiter">
          <RecruiterDashboard />
        </ProtectedRoutes>
      } />


      <Route
        path="/company-profile"
        element={
          <ProtectedRoutes role="recruiter">
            <CompanyProfile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/post-job"
        element={
          <ProtectedRoutes role="recruiter">
            <PostJob />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/my-jobs"
        element={
          <ProtectedRoutes role="recruiter">
            <MyJobs />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/my-jobs/:jobId"
        element={
          <ProtectedRoutes role="recruiter">
            <RecruiterJobDetails />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/edit-job/:jobId"
        element={
          <ProtectedRoutes role="recruiter">
            <PostJob />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/recruiter/jobs/:jobId/applicants"
        element={
          <ProtectedRoutes role="recruiter">
            <JobApplicants />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/recruiter/candidate/:userId"
        element={
          <ProtectedRoutes role="recruiter">
            <ViewCandidateProfile />
          </ProtectedRoutes>
        }
      />






      <Route
        element={
          <ProtectedRoutes role="candidate">
            <CandidateLayout />
          </ProtectedRoutes>
        }
      >
        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        />


        <Route
          path="/candidate/profile"
          element={<CandidateProfile />}
        />

        <Route
          path="/candidate/jobs"
          element={<BrowseJobs />}
        />


        <Route
          path="/candidate/jobs/:id"
          element={<CandidateJobDetails />}
        />

        <Route
          path="/candidate/my-applications"
          element={<MyApplications />}
        />


      </Route>



    </Routes>
  );
}

export default AppRoutes;