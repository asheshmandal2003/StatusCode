import { createProfile, getProfilesForMap } from "../controllers/profile";
import { router } from "../util/router";

router.route("/:userId/profile").get(getProfilesForMap).post(createProfile);

export default router;
