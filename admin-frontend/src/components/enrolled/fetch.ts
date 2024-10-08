import axios from "axios"
import { BASE_URL } from "../../config"
export const fetchEnrolled = async()=>{
const response = await axios.get(`${BASE_URL}/subscriber`,{
    withCredentials:true
})
return response.data.course_partner
}