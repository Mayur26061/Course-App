import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { userLoadingState } from "../../stores/selectors/isUserLoading";
import { logOutAction } from "./fetch";
import Searchbar from "./Searchbar";

const Appbar = () => {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userOnlyState);
  const isLoading = useRecoilValue(userLoadingState);
  const navigate = useNavigate();
  const onLogOut = async () => {
    await logOutAction();
    setUser({
      isLoading: false,
      user: null,
    });
    navigate("/signin");
  };
  return (
    <div className="flex justify-between items-center p-2 bg-slate-50 sticky top-0 z-10 gap-2 shadow-md">
      <div className="flex items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer px-2 py-1 text-lg font-semibold">
            SmartLearn
        </div>
      </div>
      <Searchbar />
      {!isLoading && (
        <>
          <div className="flex flex-grow justify-end gap-2">
            <a
              className="py-1 px-2 text-blue-700 border border-blue-700 rounded-full"
              href="http://localhost:8000/"
              target="_blank"
            >
              Be an Instrutor
            </a>
            {!userEmail && (
              <>
                <button
                  className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </>
            )}
            {userEmail && (
              <button
                className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-900"
                onClick={onLogOut}
              >
                Logout
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Appbar;
