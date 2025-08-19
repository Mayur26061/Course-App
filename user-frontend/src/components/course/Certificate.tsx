import { FC, useState } from "react";
import { UserCourseCertifaction } from "../../libs/types/course";
import { generateCertificate } from "./fetch";
import { Loading } from "../common/Loading";

interface CertificateProps {
  cData: UserCourseCertifaction;
}
const Certificate: FC<CertificateProps> = ({ cData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadCertificate = async () => {
    setIsLoading(true);
    const data = await generateCertificate(cData.id);
    if (!data.url) {
      setIsLoading(false);
      return;
    }
    const link = document.createElement("a");
    link.href = data.url;
    link.setAttribute("download", data.filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex items-center justify-start p-5 bg-white gap-2">
      <div className="w-20">
        <img
          className="w-full h-full"
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d2j5ihb19pt1hq.cloudfront.net/certificates/cert-course.png"
          alt="image"
        />
      </div>
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-lg">{cData.course.title} </h1>
        <p className="text-xs mt-2">{cData.course.author.name} </p>
        <p className="text-sm">
          Completed on:{" "}
          <span className="font-bold">{new Date(cData.completed_date).toLocaleDateString()}</span>
        </p>
      </div>
      <button
        onClick={downloadCertificate}
        className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700 text-nowrap"
      >
        View Certifcate
      </button>
    </div>
  );
};

export default Certificate;
