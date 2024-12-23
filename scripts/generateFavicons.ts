import { FaviconOptions, favicons } from "favicons";
import fs from "fs/promises";
import path from "path";
// taken from https://www.npmjs.com/package/favicons
const source = "public/icon.png"; // Source image(s). `string`, `buffer` or array of `string`
const dest = "public";
const configuration: FaviconOptions = {
  path: "/public", // Path for overriding default icons path. `string`
  appName: "WayneHacks 3 Hackathon", // Your application's name. `string`
  appShortName: "WayneHacks", // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription:
    "WayneHacks is a 24-hour in-person Hackathon at Wayne State University. All majors and skill levels are welcome with teams up to four people. Prizes will be awarded to the best projects, so be ready!", // Your application's description. `string`
  developerName: "thatziv", // Your (or your developer's) name. `string`
  developerURL: "https://github.com/thatziv", // Your (or your developer's) URL. `string`
  dir: "auto", // Primary text direction for name, short_name, and description
  lang: "en-US", // Primary language for name and short_name
  background: "#2b2b2b", // Background colour for flattened icons. `string`
  theme_color: "#181818", // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: "/", // set of URLs that the browser considers within your app
  start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
  preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
  relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
  version: "1.0", // Your application's version string. `string`
  pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  manifestMaskable: false, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
  },
  shortcuts: [
    // Your applications's Shortcuts (see: https://developer.mozilla.org/docs/Web/Manifest/shortcuts)
    // Array of shortcut objects:
    {
      name: "Create an account", // The name of the shortcut. `string`
      short_name: "Sign up", // optionally, falls back to name. `string`
      description: "Create an account", // optionally, not used in any implemention yet. `string`
      url: "/login?signup=true", // The URL this shortcut should lead to. `string`
    },
    {
      name: "Login",
      short_name: "Sign in",
      description: "Login to your account",
      url: "/login",
    },
    {
      name: "View Application",
      short_name: "Application",
      description: "View or apply your application",
      url: "/application",
    },
    // more shortcuts objects
  ],
};
async function main() {
  try {
    const response = await favicons(source, configuration);

    console.log(response.images); // Array of { name: string, contents: <buffer> }
    console.log(response.files); // Array of { name: string, contents: <string> }
    console.log(response.html); // Array of strings (html elements)
    await fs.mkdir(dest, { recursive: true });
    await Promise.all(
      response.images.map(
        async (image) =>
          await fs.writeFile(
            path.join(dest, image.name),
            image.contents as unknown as string
          )
      )
    );
    await Promise.all(
      response.files.map(
        async (file) =>
          await fs.writeFile(path.join(dest, file.name), file.contents)
      )
    );
    await fs.writeFile(path.join(dest, "/"), response.html.join("\n"));
  } catch (error) {
    console.log((error as Error).message);
  }
}

main();
