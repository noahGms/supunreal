import {Router} from "express";
import {login, register, whoami} from "../controller/auth.js";
import {isAuth} from "../middleware/auth.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/whoami", [isAuth], whoami);

export default authRouter;
