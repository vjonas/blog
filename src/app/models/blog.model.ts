export interface Blog {
  id: number;
  date: string;
  title: string;
  body: string;
  votes: Record<string, any>;
}
