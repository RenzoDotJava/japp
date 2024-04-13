export type Id = string | number;

export type Application = {
  id: Id;
  sectionId: Id;
  content: string;
}

export type Section = {
  id: Id;
  title: string;
}