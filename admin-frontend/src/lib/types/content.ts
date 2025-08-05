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
