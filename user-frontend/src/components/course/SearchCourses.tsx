import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {  useSetRecoilState } from "recoil";
import { Loading } from "../common/Loading";
import { fetchSearchTerm } from "../common/fetch";
import { CourseType } from "../../libs/types/course";
import { searchState } from "../../stores/atoms/search";
import CoursesContainer from "./CoursesContainer";

const SearchCourses: FC = () => {
  const [search] = useSearchParams();
  const setSearchState = useSetRecoilState(searchState);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const term = search.get("search")?.trim() || "";


  useEffect(() => {
    // const term = search.get("search")?.trim() || "";

    const fetchData = async () => {
      try {
        const response = await fetchSearchTerm(term);
        setCourses(response.courses);
      } catch {
        console.error("Something went wrong");
      }
      setIsLoading(false);
    };
    if (term) {
      setIsLoading(true)
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    const term = search.get("search")?.trim() || "";
    setSearchState(term);
    return () => setSearchState("");
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if(!courses.length){
    return <div className="text-center">No result found for "{term}"</div>
  }

  return (
    <div>
      <div className="p-1 m-1">Result for "{term}"</div>
      <CoursesContainer courses={courses} />
    </div>
  );
};

export default SearchCourses;
