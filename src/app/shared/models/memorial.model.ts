export class Memorial {
  uuid: string;
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
  published: boolean;
  latitude?: number;
  longitude?: number;
}
