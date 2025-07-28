import { useEffect, useState } from "react";
import { UserCourseCertifaction } from "../../libs/types/course";
import { Loading } from "../common/Loading";
import Certificate from "./Certificate";
import { fetchMyCertifations } from "./fetch";

const MyCertification = () => {
  const [courseDatas, setCourseDatas] = useState<UserCourseCertifaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyCertifations();
        if (response.data.error) {
          console.log(response.message);
          return;
        }
        console.log(response.data);
        setCourseDatas(response.data);
      } catch {
        console.error("Something went wrong");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!courseDatas.length) {
    return <div className="text-center">No Certification Found</div>;
  }

  return (
    <div className="max-w-lg w-full mx-auto mt-5">
      {courseDatas.map((data) => (
        <Certificate key={data.id} cData={data} />
      ))}
    </div>
  );
};

export default MyCertification;
