import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";

export default function Sidebar() {

  return (
    <div className="sidebar">

      <h2 className="logo">
        Alpine Primo
      </h2>

      <Link to="/dashboard/upload" className="menu-item">

        <UploadIcon />

        Upload

      </Link>

      <Link to="/dashboard/records" className="menu-item">

        <DescriptionIcon />

        Records

      </Link>

    </div>
  );
}