export default interface ICreateProductDTO {
  name: string;
  description: string;
  type: 'physical' | 'digital';
  principalImage?: string;
}
