// src/render.js
const escapeHtml = require("./escape");

const TONES = {
	// semantic name -> WHOLE class names
	info: "border-sky-200 bg-sky-50 text-sky-900",
	warning: "border-amber-200 bg-amber-50 text-amber-900",
	danger: "border-rose-200 bg-rose-50 text-rose-900",
};

const BLOCKS = {
	p: ({ text }) =>
		`<p class="my-4 leading-7 text-slate-700">${escapeHtml(text)}</p>`,

	list: ({ ordered = false, items = [] }) => {
		const tag = ordered ? "ol" : "ul";
		const cls = ordered ? "list-decimal" : "list-disc";
		return `<${tag} class="my-4 ${cls} space-y-1 pl-6 text-slate-700">${items
			.map((item) => `<li>${escapeHtml(item)}</li>`)
			.join("")}</${tag}>`;
	},

	code: ({ language = "js", source }) =>
		`<pre class="my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100"><code data-language="${escapeHtml(language)}" class="font-mono">${escapeHtml(source)}</code></pre>`,

	command: ({ text }) =>
		`<p class="my-4 rounded-md bg-slate-100 px-4 py-2 font-mono text-sm text-slate-800">$ ${escapeHtml(text)}</p>`,

	callout: ({ tone = "info", text }) =>
		`<aside class="my-4 rounded-md border px-4 py-3 text-sm ${TONES[tone] ?? TONES.info}">${escapeHtml(text)}</aside>`,
};

function renderBlock(block) {
	const render = BLOCKS[block.type];
	if (!render) throw new Error(`Unknown block type: ${block.type}`);
	return render(block);
}

function renderSection(section, index) {
	return `<section class="mt-10">
  <h2 id="${escapeHtml(section.id ?? `section-${index + 1}`)}" class="text-xl font-semibold text-slate-900">${escapeHtml(section.heading)}</h2>
  ${(section.blocks ?? []).map(renderBlock).join("\n")}
</section>`;
}

module.exports = { renderSection, renderBlock };
