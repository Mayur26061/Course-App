import { Alert } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../stores/atoms/user";
import { resetPasswordAction } from "./fetch";

const ChangePassword = () => {
  const [old, setOld] = useState("");
  const [newpass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors({});
    const obj: { confirm?: string; newpass?: string } = {};

    if (old && newpass && old === newpass) {
      obj.newpass = "Same as Old password";
    }
    if (confirm && newpass !== confirm) {
      obj.confirm = "Password didn't match";
    }
    setErrors(obj);
  }, [old, newpass, confirm]);

  const onSubmitForm = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    const payload = {
      oldPassword: old,
      newPassword: newpass,
      confirmPassword: confirm,
    };
    const response = await resetPasswordAction(payload);
    console.log(response);
    if (!response.error) {
      setUser({
        isLoading: false,
        user: null,
      });
      navigate("/signin");
    }
  };

  return (
    <div className="w-72 m-auto px-4 py-8 bg-white">
      <form onSubmit={onSubmitForm}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <label htmlFor="oldpass">Old Password</label>
            <input
              id="oldpass"
              type="text"
              className="outline-none border focus:border-gray-400 px-2 py-2"
              placeholder="Old Password"
              value={old}
              onChange={(ev) => {
                setOld(ev.target.value);
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="newpass">New Password</label>
            <input
              id="newpass"
              className="outline-none border focus:border-gray-400 px-2 py-2"
              type="password"
              value={newpass}
              onChange={(ev) => {
                setNewPass(ev.target.value);
              }}
              required
            />
            {errors.newpass && <Alert severity="error">{errors.newpass}</Alert>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input
              id="confirmpass"
              className="outline-none border focus:border-gray-400 px-2 py-2"
              type="password"
              value={confirm}
              onChange={(ev) => {
                setConfirm(ev.target.value);
              }}
              required
            />
            {errors.confirm && <Alert severity="error">{errors.confirm}</Alert>}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 disabled:bg-gray-700"
            disabled={
              !newpass || !old || !confirm || Object.keys(errors).length > 0
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
