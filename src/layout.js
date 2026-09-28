// src/layout.js
const { renderSection } = require("./render");
const escapeHtml = require("./escape");
const pages = require("../pages");

function renderLayout({ title, sections, currentSlug = null }) {
	const nav = pages
		.map((page) => {
			const active = page.slug === currentSlug;
			return `<a href="/${page.slug}" class="rounded px-2 py-1 ${
				active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
			}">${escapeHtml(page.title)}</a>`;
		})
		.join("\n        ");

	return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · Node Fullstack Notes</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body class="min-h-full bg-slate-50 text-slate-900 antialiased">
  <header class="border-b border-slate-200 bg-white">
    <nav class="mx-auto flex max-w-3xl flex-wrap gap-x-4 gap-y-2 px-6 py-4 text-sm">
        ${nav}
    </nav>
  </header>
  <main class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="text-3xl font-bold tracking-tight">${escapeHtml(title)}</h1>
${sections.map(renderSection).join("\n")}
  </main>
</body>
</html>`;
}

module.exports = renderLayout;
