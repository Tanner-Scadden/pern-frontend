export interface Event {
  id?: number;
  title: string;
  user_id: number;
  start_date: Date;
  end_date: Date;
  description?: string;
  date_created?: Date;
  date_modified?: Date;
  date_deleted?: Date;
}
export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  date_created?: Date;
  date_modified?: Date;
  date_deleted?: Date;
}
