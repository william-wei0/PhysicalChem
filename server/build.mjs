import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/server.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  outfile: "dist/server.js",
  sourcemap: true,
  packages: "external",
}).catch(() => process.exit(1));

