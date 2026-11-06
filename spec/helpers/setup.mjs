import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(
  path.resolve("index.html"),
  "utf8"
);

const dom = new JSDOM(html, {
  url: "http://localhost"
});

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLCanvasElement = dom.window.HTMLCanvasElement;

console.log("JSDOM setup loaded successfully");
