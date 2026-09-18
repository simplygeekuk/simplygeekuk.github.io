import { defineConfig } from "astro/config";
import optimizeImages from "./integrations/optimize-images.mjs";

export default defineConfig({
  site: "https://simplygeek.co.uk",
  output: "static",
  trailingSlash: "always",
  integrations: [optimizeImages()],
});
