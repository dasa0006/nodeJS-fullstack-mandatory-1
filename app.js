// app.js
const path = require("node:path");
const express = require("express");
const routes = require("./src/routes");
const renderLayout = require("./src/layout");

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static(path.join(__dirname, "public"))); // serves /app.css
app.use(routes);

app.use((req, res) => {
	res
		.status(404)
		.type("html")
		.send(
			renderLayout({
				title: "Not found",
				sections: [
					{
						heading: "404",
						blocks: [{ type: "p", text: `No page for ${req.path}.` }],
					},
				],
			}),
		);
});

app.use((err, req, res, next) => {
	// Express 5 auto-forwards async rejections
	console.error(err);
	res
		.status(500)
		.type("html")
		.send(
			renderLayout({
				title: "Server error",
				sections: [
					{ heading: "500", blocks: [{ type: "p", text: "Something broke." }] },
				],
			}),
		);
});

app.listen(port, () => console.log(`http://localhost:${port}`));
