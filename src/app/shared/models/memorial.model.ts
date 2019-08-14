export class Memorial {
  uuid: string;
  user_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  birth_date: Date;
  death_date: Date;
  create_at: Date;
  updated_at: Date;
  description: string;
  public_post: boolean;
  public_photo: boolean;
  published: boolean;
  latitude?: number;
  longitude?: number;
  location?: string;
  posX: number;
  posY: number;
  scale: number;
  rot: number;
  unlocked: boolean;
}
