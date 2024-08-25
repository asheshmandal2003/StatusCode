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
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  latitude?: number;
  longitude?: number;
  avatar_url?: string;
  avatar_public_id?: string;
  hospitalName?: string;
  bloodGroup?: string;
  bloodBankName?: string;
  address?:
    | {
        address?: string;
        district?: string;
        city?: string;
        state?: string;
        zipCode?: string;
      }
    | null
    | undefined;
};
