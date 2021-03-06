const andyWowhol = require("./projects/andy-wowhol.json");
const blizzconVirtualTicket = require("./projects/blizzcon-virtual-ticket.json");
const diablo20thAnniversary = require("./projects/diablo-20th-anniversary");
const diablo3Infrastructure = require("./projects/diablo-3-infrastructure");
const diablo4 = require("./projects/diablo-4");
const htmlReferenceWebApplication = require("./projects/html-reference-web-application.json");
const pixelArtScrapbook = require("./projects/pixel-art-scrapbook.json");
const riseOfTheNecromancer = require("./projects/rise-of-the-necromancer.json");
const tailwindcssLogical = require("./projects/tailwindcss-logical.json");
const vidcasterThemeEditor = require("./projects/vidcaster-theme-editor.json");
const vidcasterVideoPlayer = require("./projects/vidcaster-video-player.json");
const vidcasterWebsite = require("./projects/vidcaster-website.json");
const wowLegion = require("./projects/wow-legion.json");
const wowRedesign = require("./projects/wow-redesign.json");

module.exports = {
	currentYear: new Date().getFullYear(),
	imageDir: "img/v7/",
	projects: [
		diablo4,
		blizzconVirtualTicket,
		diablo3Infrastructure,
		wowRedesign,
		tailwindcssLogical,
		riseOfTheNecromancer,
		diablo20thAnniversary,
		htmlReferenceWebApplication,
		wowLegion,
		andyWowhol,
		pixelArtScrapbook,
		vidcasterThemeEditor,
		vidcasterVideoPlayer,
		vidcasterWebsite
	]
};
