import { UserRoutes } from "@/Modules/User/User.route";
import { Router } from "express";

const routes = Router();

export const moduleRoute = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoute.forEach((Route) => routes.use(Route.path, Route.route));

export default routes;
