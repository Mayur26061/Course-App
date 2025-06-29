import { Search } from "@mui/icons-material";
import { FC, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../../stores/atoms/search";

interface SearchbarProps {
  children?: string;
}

const Searchbar: FC<SearchbarProps> = () => {
  const nav = useNavigate();
  const [searchValue, setSearchValue] = useRecoilState(searchState);

  const _Submit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    nav(`/search?search=${searchValue}`);
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
    // For now hiding search bar in mobile view
    <div className="border-black flex-grow max-sm:hidden">
      <form className="flex" onSubmit={_Submit}>
        <div className="flex w-full">
          <input
            placeholder="Search Course"
            value={searchValue}
            className="outline-none w-full sm:w-64 border border-r-0 rounded-l-2xl px-4 py-1 focus-within:w-full ease-in-out transition-all duration-500 transform"
            onChange={(ev) => {
              setSearchValue(ev.target.value);
            }}
          />
          <button type="submit" className="border border-l-0 rounded-r-2xl">
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
