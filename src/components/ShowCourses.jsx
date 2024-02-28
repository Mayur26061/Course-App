/* eslint-disable react/prop-types */
import axios from "axios";
import React,{useEffect} from "react";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses",{
            headers:{
                authorization:localStorage.getItem('auth')
            }
        }).then(resposne=>{
            setCourses(resposne.data.courses)
        }).catch(err=>{
            console.log(err)
            
        })
    },[])

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course key={c._id} title={c.title} />)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

export default ShowCourses;