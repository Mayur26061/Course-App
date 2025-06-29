import { Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { courseContentState } from "../../stores/selectors/course";
import Content from "./Content";

const ContentSection = () => {
  const content = useRecoilValue(courseContentState);
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
