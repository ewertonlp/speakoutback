/**
 * postclosed router
 */

import { factories } from "@strapi/strapi";
import { Router } from "@strapi/strapi/lib/types/factories";
import custom from "./custom";
// export default factories.createCoreRouter("api::postclosed.postclosed");
const coreRouter = factories.createCoreRouter(
  "api::postclosed.postclosed"
) as unknown as Router;
const customRouter = {
  get prefix() {
    return coreRouter.prefix;
  },
  get routes() {
    return [...coreRouter.routes, ...custom.routes];
  },
};

export default customRouter;
