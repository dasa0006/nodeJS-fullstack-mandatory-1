const { renderSection } = require("./render");
const escapeHtml = require("./escape");
const pages = require("../pages");

function renderLayout({ title, sections, currentSlug = null }) {
	const nav = pages
		.map((page, index) => {
			const active = page.slug === currentSlug;
			if (index === 0) return null; // Skip the first page (index 0) in the navigation
			return `<li class="w-full">
						<a href="/${page.slug}" class="w-full px-4 text-[#fdbf35] font-medium text-ellipsis overflow-hidden whitespace-nowrap ${
							active ? "bg-gray-500" : ""
						}">${escapeHtml(page.title)}</a>
					</li>`;
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
<body class="relative min-h-screen w-screen bg-[#353535] antialiased">
    <nav class="h-7 w-full border-b border-[#4e4e4e]">
    </nav>
    <div class="flex min-h-full w-full">
		<div class="h-[calc(100dvh-32px)] min-w-50 max-w-125 flex-col overflow-x-hidden bg-[#505050]">
			<div class="flex w-full flex-col items-center justify-center">
				<h2 class="ml-15 w-full text-xl font-medium">
					<a href="/">Docs</a>
				</h2>
				<ul class="ml-23 w-full pt-0.5 pb-4">
          ${nav}
				</ul>
			</div>
		</div>
  <main class="relative grow pt-2.5 pr-3.5 pb-10 pl-11">
  <div class="flex w-full">
    <h1 class="text-2xl font-bold tracking-tight">
      Class <span class="text-gray-300">${escapeHtml(title)}</span>
    </h1>
  </div>
  ${sections.map(renderSection).join("\n")}
  </main>
</body>
</html>`;
}

module.exports = renderLayout;
