export type User = {
  id: string;
  email?: string;
  password?: string;
  role?: string;
  profile?:
    | {
        id: string;
      }
    | null
    | undefined;
};
