import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchSearchTerm } from "../common/fetch";
import { CourseType } from "../../libs/types/course";
import { searchState } from "../../stores/atoms/search";
import CoursesContainer from "./CoursesContainer";

const SearchCourses: FC = () => {
  const [search] = useSearchParams();
  const setSearchState = useSetRecoilState(searchState);
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const term = search.get("search")?.trim() || "";

    const fetchData = async () => {
      const response = await fetchSearchTerm(term);
      setCourses(response.courses);
    };
    if (term) {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    const term = search.get("search")?.trim() || "";
    setSearchState(term);
    return () => setSearchState("");
  }, []);

  return (
    <div>
      <CoursesContainer courses={courses} />
    </div>
  );
};

export default SearchCourses;
