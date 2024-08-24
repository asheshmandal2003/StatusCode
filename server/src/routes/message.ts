import { sendMailToDonor, sendMessage } from "../controllers/message";
import { router } from "../util/router";

router.route("/:id/send-message").post(sendMessage);
router.route("/:id/send-mail").post(sendMailToDonor);

export default router;
