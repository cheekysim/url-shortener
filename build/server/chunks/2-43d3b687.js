import { g as getData, A as API_TOKEN } from './getData-27272a26.js';

const actions = {
  default: async ({
    request
  }) => {
    const formData = await request.formData();
    const long = formData.get("longUrl");
    let short = formData.get("shortUrl") || formData.get("shortUrlPlaceholder");
    if (!short) {
      short = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    short = short.toString();
    if (short.length > 20) {
      return { short, processed: true, code: 413 };
    }
    const currentData = await getData();
    const longExists = currentData.find((data) => data.long === long);
    const shortExists = currentData.find((data) => data.short === short);
    if (longExists) {
      return { short: longExists.short, processed: true, code: 304 };
    } else if (shortExists) {
      return { short: short.toString(), processed: true, code: 409 };
    }
    await fetch("http://localhost:3005/api/v1/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ long, short })
    });
    return { short, processed: true, code: 200 };
  }
};
async function load() {
  const data = await getData();
  return {
    body: data
  };
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-e8b028b8.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.1c067d65.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.83732ebc.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-43d3b687.js.map
