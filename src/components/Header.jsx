import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function Header() {

  const name = localStorage.getItem("name");

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div className="topbar">

      <h2>
        Dashboard
      </h2>

      <div className="topbar-right">

        <Avatar>
          {name?.charAt(0)}
        </Avatar>

        <h3>{name}</h3>

        <Button
          variant="contained"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>

      </div>

    </div>
  );
}