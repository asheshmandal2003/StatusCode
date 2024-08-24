import { login, register } from "../controllers/auth";
import { router } from "../util/router";
import { validateRegistration } from "../validations/auth";

router.route("/register").post(validateRegistration, register);
router.route("/login").post(login);

export default router;
