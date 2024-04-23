export class Product {
  confidence: number;
}
export class ImageModel {
  apple?: { OR: { contains: string }[]; list: Product[] };
  banana?: { OR: { contains: string }[]; list: Product[] };
  carrot?: { OR: { contains: string }[]; list: Product[] };
  corn?: { OR: { contains: string }[]; list: Product[] };
  orange?: { OR: { contains: string }[]; list: Product[] };
  strawberry?: { OR: { contains: string }[]; list: Product[] };
  tomato?: { OR: { contains: string }[]; list: Product[] };
}
