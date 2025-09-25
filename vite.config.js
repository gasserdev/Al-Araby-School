export default defineConfig({
  root: "public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "public/index.html"),
        createAccount: resolve(__dirname, "public/pages/create_account.html"),
      },
    },
  },
  server: {
    host: true,
    port: 3000
  },
  publicDir: resolve(__dirname, "public/assets")
});
