export interface ContentType {
  id: string;
  createAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  type: string;
  published: boolean;
  content_url?: string;
  body?: string;
  duration: Date | null;
  course_id: string;
}

export interface CourseType {
  id: string;
  createAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  published: boolean;
  image: string;
  duration: Date | null;
  author_id: string;
  category: string | null;
  contents: ContentType[];
  author: {
    name: string;
  };
}

interface UserContent {
  id: string;
  user_course_id: string;
  content_id: string;
  completed: boolean;
}

interface UserCourse {
  course_id: string;
  user_contents: UserContent[];
}

export interface UserType {
  id: string;
  name: string;
  username: string;
  image: string | null;
  createAt: Date;
  userType: string;
  isApproved: boolean;
  user_courses: UserCourse[];
}

export interface UserCourseCertifaction {
  id: string;
  course_id: string;
  user_id: string;
  completed_date: string;
  joined_date: string;
  status: string;
  course: CourseType;
}
