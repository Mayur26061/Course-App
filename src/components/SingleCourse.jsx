import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCourse from "./EditCourse";
import { Button, Typography } from "@mui/material";
import "./SingleCourse.css";

const SingleCourse = () => {
  let { cid } = useParams();
  const [course, setCourse] = useState();
  const [isedit, setIsEdit] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getcourse", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          courseId: cid,
        },
      })
      .then((response) => {
        setCourse(response.data.course);
      });
  }, []);
  return (
    <div>
      {(course &&
      (<GrayTopper title={course.title}/>))}
    </div>
  )
}

export default SingleCourse;
  
  function GrayTopper({title}){
    return (
      <div style={{height:250, background:"#212121", top:0, width:"100vw", zIndex:"0"}}>
      <div style={{height:250, display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <div>
          <Typography style={{color:"white", fontWeight:600}} variant="h3" textAlign={"center"}>
            {title}
          </Typography>
        </div>
      </div>
      </div>
    )
  }
  
  

  // return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}
//     >
//       {course && (
//         <div>
//           <div style={{ display: "flex" }}>
//             <img
//               src={course.imageLink}
//               style={{ width: 900, height: 400 }}
//               alt=""
//             />
//           </div>
//           <div style={{ display: "flex" }}>
//             <div>
//               <Typography variant="h5">{course.title}</Typography>
//               <Typography>Rs.{course.price}</Typography>
//             </div>
//             <div>
//               <Button variant="outlined" onClick={() => setIsEdit(true)}>
//                 Edit
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isedit && (
//         <EditCourse
//           course={course}
//           setCourse={setCourse}
//           setIsEdit={setIsEdit}
//         />
//       )}
//     </div>
//   );
// };

