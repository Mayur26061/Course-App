import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Appbar = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", padding: 10 }}
    >
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      <div>
        <Button size="small" variant="contained" onClick={()=>navigate('/register')}>
          Sign Up
        </Button>
        <Button size="small" onClick={()=>navigate('/login')}>Sign In</Button>
      </div>
    </div>
  );
};

export default Appbar;
