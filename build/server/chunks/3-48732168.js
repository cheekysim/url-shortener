import { r as redirect } from './index-9b9a1ed0.js';
import { g as getData } from './getData-27272a26.js';

async function load({ params }) {
  const data = await getData();
  const url = data.find((u) => u.short === params.short);
  if (url) {
    throw redirect(308, url.long);
  } else {
    throw redirect(308, "/");
  }
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
const server_id = "src/routes/[short]/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-48732168.js.map
