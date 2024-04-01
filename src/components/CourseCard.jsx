import { Card, Typography } from "@mui/material"

const CourseCard = ({course})=>{
    return <div>
        <Card style={{
            margin:10,
            width:350,
            minHeight:200,
            borderRadius:20,
            marginRight:50,
            paddingBottom:15,
            zIndex:2
        }}>
            <img src={course.imageLink} style={{width:350}} alt="img"/>
            <div style={{marginLeft:10}}>
                <Typography variant="h5">{course.title}</Typography>
                <Typography variant="subtitle2" style={{color:"gray"}}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    <b>Rs {course.price}</b>
                </Typography>
            </div>
        </Card>
    </div>
}
export default CourseCard