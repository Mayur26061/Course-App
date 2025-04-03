import { Input } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../../stores/atoms/search";

type Tprops = {
  children?: string;
};
// setuserState:React.Dispatch<React.SetStateAction<boolean>>
const Searchbar: FC<Tprops> = () => {
  const nav = useNavigate()
  const [searchValue, setSearchValue] = useRecoilState(searchState);


  const _Submit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    nav(`/search?search=${searchValue}`)
  };
  // const onChangeSearch = ()=>{
  //   console.log(searchValue)
  // }

  // useEffect(() => {
  //   const debounce = setTimeout(onChangeSearch, 400);
  //   return () => clearTimeout(debounce);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchValue]);

  return (
    <div className="border-black flex-grow">
      <form className="flex " onSubmit={_Submit}>
        <Input
          placeholder="Search Course"
          value={searchValue}
          className="w-28 focus-within:w-full ease-in-out transition-all duration-500 transform border border-r-0"
          onChange={(ev) => {
            setSearchValue(ev.target.value);
          }}
        />
        <button type="submit" className="border border-l-0 rounded-r-2xl">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
