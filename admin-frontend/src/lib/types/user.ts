export interface UserTypeBase {
  username: string;
  userType: string;
  name: string;
}

export interface UserType extends UserTypeBase {
  id: string;
  image: string | null;
  createAt: string;
  isApproved: boolean;
}
