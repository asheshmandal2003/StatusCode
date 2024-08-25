export type Profile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  avatar_url: string;
  latitude: number;
  longitude: number;
  phoneNo: string;
  user: {
    email: string;
  };
  address:
    | {
        address: string;
        city: string;
        district: string;
        zipCode: number;
      }
    | null
    | undefined;
};
