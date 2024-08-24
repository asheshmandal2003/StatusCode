import { upload } from "../config/multerConfig";
import {
  createHospitalProfile,
  createProfile,
  getProfilesForMap,
} from "../controllers/profile";
import { router } from "../util/router";

router
  .route("/:userId/profile")
  .get(getProfilesForMap)
  .post(upload.single("image"), createProfile);
router
  .route("/:userId/profile/create")
  .post(upload.single("image"), createHospitalProfile);

export default router;
