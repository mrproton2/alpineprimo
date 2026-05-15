import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RecordsPage from "./pages/RecordsPage";
import UploadForm from "./components/UploadForm";

function App() {

 return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="upload" element={<UploadForm />} />

          <Route path="records" element={<RecordsPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;