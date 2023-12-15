import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Landing, Register, ProtectedRoute } from "./pages";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AllJobs, SharedLayout, Stats, AddJob, Profile } from "./pages/Dashboard";

function App() {
  return (
    //Router Configuration
    <BrowserRouter>
      {/* Routes creation */}
      <Routes>
        {/*Home route configuration. Wrap SharedLayout with ProtectedRoute component to handle unauthorized access redirection*/}
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } >
          {/* Stats page route */}
          <Route index element={<Stats />} />
          {/* All jobs page route */}
          <Route path="all-jobs" element={<AllJobs />} />
          {/* Add job page route */}
          <Route path="add-job" element={<AddJob />} />
          {/* Porfile page route */}
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* Landing page route */}
        <Route path='landing' element={<Landing />} />
        {/* Register page route */}
        <Route path='register' element={<Register />} />
        {/* Error page route */}
        <Route path='*' element={<Error />} />
      </Routes>
      {/* Toast notification declaration. Position top-center auto close notifications after 1,5 sec. */}
      <ToastContainer position="top-center" autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
