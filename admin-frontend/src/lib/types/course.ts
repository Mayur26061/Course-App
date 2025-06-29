interface Userfield {
  id: string;
  name: string;
}
export interface CourseType {
  id: string;
  createAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: string;
  published: boolean;
  image: string;
  duration: Date | null;
  author_id: string;
  category: string | null;
  author: Userfield;
}

export interface CourseProps {
  course: CourseType;
}

export interface CourseUserType extends CourseProps {
  id: string;
  course_id: string;
  user_id: string;
  completed_date: string | null;
  joined_date: string;
  status: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
