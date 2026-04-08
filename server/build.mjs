import esbuild from "esbuild";
import fs from "fs";
import path from "path";

const copyManifests = {
  name: "copy-manifests",
  setup(build) {
    build.onEnd(() => {
      const src = path.join("src/assets/manifests");
      const dest = path.join("dist/assets/manifests");
      fs.cpSync(src, dest, { recursive: true });
    });
  },
};

esbuild.build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/server.js",
  sourcemap: true,
  packages: "external",
  plugins: [copyManifests],
}).catch(() => process.exit(1));

