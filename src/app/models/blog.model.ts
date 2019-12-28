export interface Blog {
  id: string;
  date: string;
  title: string;
  body: string;
  votes: Record<string, any>;
}
