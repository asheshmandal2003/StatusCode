export async function parseLocation() {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (data) => {
          const coord = {
            lat: data.coords.latitude,
            lon: data.coords.longitude,
          };
          resolve(coord);
        },
        (err) => {
          reject("Location is required!");
        }
      );
    } catch (err) {
      reject("Geolocation is not supported in this browser");
    }
  });
}
