import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../assets/professor.jpeg";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../stores/selectors/userEmail";
import { userLoadingState } from "../stores/selectors/isUserLoading";
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  const userEmail = useRecoilValue(userEmailState);
  const isLoading = useRecoilValue(userLoadingState);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          {!isLoading && (
            <div style={{ marginTop: 100 }}>
              <Typography variant={"h2"}>Coursera</Typography>
              <Typography variant={"h5"}>
                A place to learn, earn and grow
              </Typography>
              {!userEmail && (
                <div style={{ padding: 5 }}>
                  <Link style={{ margin: 2 }} to={"/signup"}>
                    <Button variant="contained">Signup</Button>
                  </Link>
                  <Link style={{ margin: 2 }} to={"/signin"}>
                    <Button variant="contained">Signin</Button>
                  </Link>
                </div>
               )}
            </div>
          )} 
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img src={image} width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
