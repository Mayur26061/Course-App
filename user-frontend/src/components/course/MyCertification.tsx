import { useEffect, useState } from "react";
import { UserCourseCertifaction } from "../../libs/types/course";
import Certificate from "./Certificate";
import { fetchMyCertifations } from "./fetch";

const MyCertification = () => {
  const [courseDatas, setCourseDatas] = useState<UserCourseCertifaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMyCertifations();
      if (response.data.error) {
        console.log(response.message);
        return;
      }
      console.log(response.data);
      setCourseDatas(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-lg w-full mx-auto mt-5">
      {courseDatas.map((data) => (
        <Certificate key={data.id} cData={data} />
      ))}
    </div>
  );
};

export default MyCertification;
