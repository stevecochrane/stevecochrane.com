const andyWowhol = require("./projects/andy-wowhol.json");
const blizzcon2018VirtualTicket = require("./projects/blizzcon-2018-virtual-ticket.json");
const diablo20thAnniversary = require("./projects/diablo-20th-anniversary");
const htmlReferenceWebApplication = require("./projects/html-reference-web-application.json");
const pixelArtScrapbook = require("./projects/pixel-art-scrapbook.json");
const riseOfTheNecromancer = require("./projects/rise-of-the-necromancer.json");
const vidcasterThemeEditor = require("./projects/vidcaster-theme-editor.json");
const vidcasterThemes = require("./projects/vidcaster-themes.json");
const vidcasterVideoPlayer = require("./projects/vidcaster-video-player.json");
const vidcasterWebsite = require("./projects/vidcaster-website.json");
const wowGarrisons = require("./projects/wow-garrisons.json");
const wowLegion = require("./projects/wow-legion.json");
const wowRedesign = require("./projects/wow-redesign.json");

module.exports = {
	imageDir: "img/v7/",
	projects: [
		blizzcon2018VirtualTicket,
		riseOfTheNecromancer,
		wowRedesign,
		diablo20thAnniversary,
		htmlReferenceWebApplication,
		wowLegion,
		andyWowhol,
		wowGarrisons,
		pixelArtScrapbook,
		vidcasterThemeEditor,
		vidcasterWebsite,
		vidcasterVideoPlayer,
		vidcasterThemes
	]
};
