//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  storage: {
    cla: {
      driver: "fs",
      base: "data",
    }
  }
});
