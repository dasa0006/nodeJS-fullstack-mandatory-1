// src/routes.js
const express = require("express");
const renderLayout = require("./layout");
const pages = require("../pages");

const router = express.Router();

router.get("/", (req, res) => res.redirect(`/${pages[0].slug}`)); // v5: single-arg redirect

for (const page of pages) {
	router.get(`/${page.slug}`, (req, res) => {
		res.type("html").send(renderLayout({ ...page, currentSlug: page.slug }));
	});
}

module.exports = router;
