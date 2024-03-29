"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const jsdom = __importStar(require("jsdom"));
const { JSDOM } = jsdom;
const files = fs.readdirSync(`chars/`);
files.forEach(function (file, _index) {
    const svg_glyph = fs.readFileSync(`chars/${file}`, 'utf-8');
    const dom = new JSDOM(svg_glyph);
    const rect = dom.window.document.querySelector("rect");
    rect.setAttribute("height", "35");
    const g = dom.window.document.querySelector("#layer1");
    const offset = {
        x: rect.getAttribute("x"),
        y: rect.getAttribute("y"),
    };
    console.log(file, g, offset);
    g?.setAttribute("transform", `translate(${-offset.x} ${-offset.y})`);
    const svg = dom.window.document.querySelector("svg");
    svg.setAttribute("width", "35mm");
    svg.setAttribute("height", "35mm");
    svg.setAttribute("viewBox", "0 0 35 35");
    fs.writeFileSync(`chars/${file}`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${svg.outerHTML}`);
});
