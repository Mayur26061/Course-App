import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../assets/professor.jpeg";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";

function Landing() {
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(userLoadingState);
  return (
    <div>
      <Grid container className="p-20">
        <Grid item xs={12} md={6} lg={6}>
          {!isLoading && (
            <div className="mt-20">
              <Typography variant={"h2"}>SmartLearn</Typography>
              <Typography variant={"h5"}>
                A place to learn, earn and grow
              </Typography>
              {!userEmail && (
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
