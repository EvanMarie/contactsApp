// /** @type {import('@remix-run/dev').AppConfig} */
// export default {
//   ignoredRouteFiles: ["**/.*"],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // publicPath: "/build/",
//   // serverBuildPath: "build/index.js",
// };

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  // ... other config,
  browserBuildDirectory: "build", // or your specific setting
  serverBuildDirectory: "build", // or your specific setting
  browserNodeBuiltinsPolyfill: {
    modules: {
      http: true,
      https: true,
      stream: true,
      string_decoder: true,
      events: true,
      timers: true,
      url: true,
    },
  },
};
