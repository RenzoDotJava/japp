declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }
}

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