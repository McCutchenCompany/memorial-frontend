export class Organization {
  uuid: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  invite_link: string;
  card_last_four?: string;
  card_brand?: string;
  image: string;
  posY: number;
  posX: number;
  scale: number;
  rot: number;
}
