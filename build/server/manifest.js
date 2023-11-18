const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/global.css","css/index.css","favicon.png"]),
	mimeTypes: {".css":"text/css",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.c8b63ed2.js","app":"_app/immutable/entry/app.8ed998dc.js","imports":["_app/immutable/entry/start.c8b63ed2.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/singletons.24e5a773.js","_app/immutable/entry/app.8ed998dc.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.83732ebc.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-12fb0722.js')),
			__memo(() => import('./chunks/1-1ddc045e.js')),
			__memo(() => import('./chunks/2-43d3b687.js')),
			__memo(() => import('./chunks/3-48732168.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/[short]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"short","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
