import * as fs from 'fs';
import * as jsdom from 'jsdom';

const { JSDOM } = jsdom;
const files = fs.readdirSync(`chars/`);
files.forEach(function (file, _index) {
	const svg_glyph = fs.readFileSync(`chars/${file}`, 'utf-8');
	const dom = new JSDOM(svg_glyph);
	const rect = dom.window.document.querySelector("rect")!;
	rect.setAttribute("height", "35");
	const g = dom.window.document.querySelector("#layer1")!;
	const offset = { 
		x: rect.getAttribute("x")!,
		y: rect.getAttribute("y")!,
	};
	console.log(file, g, offset);

	g?.setAttribute("transform",`translate(${-offset.x} ${-offset.y})`);

	const svg = dom.window.document.querySelector("svg")!;

	svg.setAttribute("width", "35mm");
	svg.setAttribute("height", "35mm");
	svg.setAttribute("viewBox", "0 0 35 35");	
	fs.writeFileSync(`chars/${file}`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${svg.outerHTML}`);
})
