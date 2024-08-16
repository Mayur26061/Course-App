import axios from "axios";
import { BASE_URL } from "./config";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./stores/atoms/user";

export const useFetchMe = ()=>{
  const setUser = useSetRecoilState(userState)
  useEffect(()=>{
        const fetchme = async () => {
            try {
              const res = await axios.get(`${BASE_URL}/me`, {
                withCredentials:true
              });
              if (res.data.error) {
                setUser({ isLoading: false, user: null });
              } else {
                setUser({ isLoading: false, user: res.data.user });
              }
            } catch {
              setUser({ isLoading: false, user: null });
              console.log("Error");
            }
          };
          fetchme();
    })
}