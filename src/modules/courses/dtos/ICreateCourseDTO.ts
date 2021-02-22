export default interface ICreateUserDTO {
  name: string;
  description: string;
  teacherId: string;
  category: string;
  tags?: string;
  principalImage?: string | null;
}
