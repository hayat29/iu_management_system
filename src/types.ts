export interface CollageImage {
  id: string;
  url: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Collage {
  id: string;
  name: string;
  images: CollageImage[];
  createdAt: Date;
}