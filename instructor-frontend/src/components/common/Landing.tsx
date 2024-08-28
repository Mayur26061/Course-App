import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../assets/professor.jpeg";
import { useRecoilValue } from "recoil";
import { userState } from "../../stores/atoms/user";
function Landing() {
  const userCurrent = useRecoilValue(userState);
  return (
    <div>
      <Grid container className="p-20">
        <Grid item xs={12} md={6} lg={6}>
          {!userCurrent.isLoading && (
            <div className="mt-20">
              <Typography variant={"h2"}>SmartLearn Intructor</Typography>
              <Typography variant={"h5"}>
                A place to learn, earn and grow
              </Typography>
              {!userCurrent.user && (
                <div className="p-1">
                  <Link className="m-1" to={"/signup"}>
                    <Button variant="contained">Signup</Button>
                  </Link>
                  <Link className="m-1" to={"/signin"}>
                    <Button variant="contained">Signin</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img src={image} className="w-full" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
