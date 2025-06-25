import { Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { courseContentState } from "../../stores/selectors/course";
import Content from "./Content";

export interface contentType {
  id: string;
  createAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  type: string;
  published: boolean;
  content_url: string;
  duration: Date | null;
  course_id: string;
}

const ContentSection = () => {
  const content = useRecoilValue<contentType[]>(courseContentState);
  return (
    <div className="flex justify-center">
      {content && (
        <Card variant="outlined" className="mt-9 p-2.5 w-full max-w-xl">
          {content.map((c) => (
            <Content key={c.id} content={c} />
          ))}
        </Card>
      )}
    </div>
  );
};

export default ContentSection;
