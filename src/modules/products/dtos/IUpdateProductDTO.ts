export default interface IUpdateProductDTO {
  productId: string;
  name?: string;
  description?: string;
  type?: 'physical' | 'digital';
  principalImage?: string;
}
