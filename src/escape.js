// src/escape.js
const MAP = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};
module.exports = (value) => String(value).replace(/[&<>"']/g, (ch) => MAP[ch]);
