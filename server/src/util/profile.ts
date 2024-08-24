import { ShortProfile } from "../types/profile";
import { prisma } from "./prisma";

export const getProfilesOnMap = async (
  reqDistance: number,
  latitude: number,
  longitude: number,
  bloodGroup: string,
  state: string
): Promise<ShortProfile[] | null> => {
  const profiles = await prisma.profile.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatar_url: true,
      latitude: true,
      longitude: true,
      phoneNo: true,
    },
    where: {
      bloodGroup: bloodGroup,
      address: {
        state,
      },
    },
    take: 100,
  });

  const filteredProfiles = profiles.filter((profile) => {
    const distance = haversineDistance(
      latitude,
      longitude,
      profile.latitude,
      profile.longitude
    );
    return distance <= reqDistance;
  });

  return filteredProfiles.length > 0 ? filteredProfiles : null;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
