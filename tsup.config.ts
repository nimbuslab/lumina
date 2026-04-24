import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "components/**/*.{ts,tsx}",
    "hooks/**/*.ts",
    "lib/**/*.{ts,tsx}",
    "tokens/**/*.ts",
    "templates/**/*.ts",
    "og/**/*.{ts,tsx}",
  ],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  splitting: false,
  external: [
    "react",
    "react-dom",
    "next",
    "framer-motion",
    "tailwindcss",
  ],
  outDir: "dist",
  target: "es2022",
  tsconfig: "./tsconfig.json",
})
