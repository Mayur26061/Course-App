import { Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { contentIsloading, contentsState } from "../../../store/selectors/content";
import Content from "./Content";
const ContentSection = () => {
  const content = useRecoilValue(contentsState);
  const loading = useRecoilValue(contentIsloading);

  if(loading){
    return "<Loading/>"
  }

  return (
    <div className="flex justify-center">
      <Card className="mt-9 p-2.5 w-full max-w-xl">
        {content && content.map((c) => <Content key={c.id} content={c} />)}
      </Card>
    </div>
  );
};

export default ContentSection;
