import React, { FC } from "react";
import { UserCourseCertifaction } from "../../libs/types/course";

interface CertificateProps {
  cData: UserCourseCertifaction;
}
const Certificate: FC<CertificateProps> = ({ cData }) => {
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
          <span className="font-bold">
            {new Date(cData.completed_date).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Certificate;
