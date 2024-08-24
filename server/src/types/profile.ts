export type ShortProfile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  avatar_url: string;
  latitude: number;
  longitude: number;
  phoneNo: string;
};

export type Profile = {
  id: string;
  user: {
    email: string;
  };
  firstName: string;
  lastName: string;
  avatar_url: string;
  phoneNo: string;
  bloodGroup: string;
  address:
    | {
        address: string;
        city: string;
        district: string;
        state: string;
        zip: number;
      }
    | null
    | undefined;
};
