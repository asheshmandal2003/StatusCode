import { cloudinary } from "../config/cloudinaryConfig";

export const uploadImg = async (
  fileBuffer: Buffer
): Promise<{ url: string | undefined; publicId: string | undefined }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "bloodmates",
          allowed_formats: ["jpg", "png", "jpeg"],
        },
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve({
            url: res?.secure_url,
            publicId: res?.public_id,
          });
        }
      )
      .end(fileBuffer);
  });
};

export const deleteImg = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};
