import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import image from "../../assets/professor.jpeg";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";

const Landing = () => {
  const userEmail = useRecoilValue(userOnlyState);
  const isLoading = useRecoilValue(userLoadingState);
  return (
    <div>
      <Grid container className="p-20">
        <Grid item xs={12} md={6} lg={6}>
          {!isLoading && (
            <div className="mt-20">
              <Typography variant={"h3"}>SmartLearn</Typography>
              <Typography variant={"h5"}>
                A place to learn, earn and grow
              </Typography>
              {!userEmail && (
                <div className="p-1">
                  <Link className="m-1" to={"/signup"}>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700">
                      Signup
                    </button>
                  </Link>
                  <Link className="m-1" to={"/signin"}>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700">
                      Signin
                    </button>
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
};

export default Landing;
