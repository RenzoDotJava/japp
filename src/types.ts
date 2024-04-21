export type Id = string | number;

export type Application = {
  id?: Id;
  jobPosition: string;
  jobType: string;
  company: string;
  salary?: string;
  column: Id;
  url?: string;
};

export type Section = {
  id: Id;
  title: string;
}