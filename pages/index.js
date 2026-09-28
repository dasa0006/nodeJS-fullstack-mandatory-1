const PAGE_MAP = [
	// frozen v1 from issue #4 — order = nav order
	["home", "Home"],
	["variables-and-data-types", "Variables & Data Types"],
	["numbers-and-strings", "Numbers & Strings"],
	["objects-and-arrays", "Objects & Arrays"],
	["loop-methods", "Loop Methods"],
	["functions", "Functions"],
	["rest-api-design", "REST API Design"],
	["first-express-server", "First Express Server"],
	["crud-and-ids", "Full CRUD & the ID Problem"],
	["dates-and-html", "Dates & Serving HTML"],
	["deployment", "Deployment"],
	["toolbox", "The Toolbox"],
];

module.exports = PAGE_MAP.map(([slug, title]) => {
	const page = require(`./${slug}`);
	if (page.slug !== slug || page.title !== title) {
		throw new Error(
			`Page-map drift: ${slug} declares ${page.slug} / ${page.title}`,
		);
	}
	return page;
});
