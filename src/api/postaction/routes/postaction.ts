/**
 * postaction router
 */

import { factories } from "@strapi/strapi";
// export default factories.createCoreRouter('api::postaction.postaction');
import { Router } from "@strapi/strapi/lib/types/factories";
import custom from "./custom";

const coreRouter = factories.createCoreRouter(
  "api::postaction.postaction"
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
