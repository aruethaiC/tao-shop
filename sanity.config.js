//this file communicates only with the sanity studio admin you will need another one for connecting to sanity through the api with groq
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: "g57622m6",
  dataset: "production",
  title: "Tao-Shop",
  apiVersion: "2024-05-06",
  basePath: "/admin",
  plugins: [
    deskTool()
  ],
  schema: { types: schemas },
});

export default config;
