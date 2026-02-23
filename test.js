const { getMusicTitlesByYear, filterAndTransformTracks } = require("./2803514-lab3.js");

// ---------- MASTER TEST DATA (includes invalid entries too) ----------
const tracks = [
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020 },
{ title: "Starboy", artist: "The Weeknd", year: 2016 },
{ title: "Levitating", artist: "Dua Lipa", year: 2021 },
{ title: "Thriller", artist: "Michael Jackson", year: 1982 },

// Invalid tracks (should be skipped in function 2, and year-skipped in function 1 if year invalid)
{ title: "No Year", artist: "X" }, // missing year
{ title: "Bad Year Type", artist: "X", year: "2020" },// year not a number
{ artist: "X", year: 2020 }, // missing title
{ title: "No Artist", year: 2020 }, // missing artist
];

// ---------- FUNCTION 1: getMusicTitlesByYear ----------
console.log("===== Function 1: getMusicTitlesByYear =====");
console.log(getMusicTitlesByYear(tracks));
console.log("Expected:");
console.log({
1982: ["Thriller"],
2016: ["Starboy"],
2020: ["Blinding Lights"],
2021: ["Levitating"]
});
console.log("\n");

// ---------- FUNCTION 2: filterAndTransformTracks ----------
console.log("===== Function 2: filterAndTransformTracks =====");

// 1) No criteria (empty object) -> return all valid tracks with decade
console.log("1) No criteria {}:");
console.log(filterAndTransformTracks(tracks, {}));
console.log("Expected:");
console.log([
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020, decade: "2020s" },
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" },
{ title: "Levitating", artist: "Dua Lipa", year: 2021, decade: "2020s" },
{ title: "Thriller", artist: "Michael Jackson", year: 1982, decade: "1980s" }
]);
console.log("\n");

// 2) Artist filter case-insensitive
console.log("2) Artist filter { artist: 'the weeknd' }:");
console.log(filterAndTransformTracks(tracks, { artist: "the weeknd" }));
console.log("Expected:");
console.log([
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020, decade: "2020s" },
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" }
]);
console.log("\n");

// 3) minYear only
console.log("3) minYear only { minYear: 2000 }:");
console.log(filterAndTransformTracks(tracks, { minYear: 2000 }));
console.log("Expected:");
console.log([
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020, decade: "2020s" },
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" },
{ title: "Levitating", artist: "Dua Lipa", year: 2021, decade: "2020s" }
]);
console.log("\n");

// 4) maxYear only
console.log("4) maxYear only { maxYear: 2019 }:");
console.log(filterAndTransformTracks(tracks, { maxYear: 2019 }));
console.log("Expected:");
console.log([
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" },
{ title: "Thriller", artist: "Michael Jackson", year: 1982, decade: "1980s" }
]);
console.log("\n");

// 5) year range
console.log("5) Year range { minYear: 2015, maxYear: 2020 }:");
console.log(filterAndTransformTracks(tracks, { minYear: 2015, maxYear: 2020 }));
console.log("Expected:");
console.log([
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020, decade: "2020s" },
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" }
]);
console.log("\n");

// 6) combined minYear + artist
console.log("6) Combined { minYear: 2015, artist: 'The Weeknd' }:");
console.log(filterAndTransformTracks(tracks, { minYear: 2015, artist: "The Weeknd" }));
console.log("Expected:");
console.log([
{ title: "Blinding Lights", artist: "The Weeknd", year: 2020, decade: "2020s" },
{ title: "Starboy", artist: "The Weeknd", year: 2016, decade: "2010s" }
]);
console.log("\n");

// 7) no matches
console.log("7) No matches { minYear: 3000 }:");
console.log(filterAndTransformTracks(tracks, { minYear: 3000 }));
console.log("Expected:");
console.log([]);
console.log("\n");

// 8) decade verification specifically
console.log("8) Decade spot checks:");
console.log("1982 ->", filterAndTransformTracks([{ title: "X", artist: "Y", year: 1982 }], {}));
console.log("2020 ->", filterAndTransformTracks([{ title: "X", artist: "Y", year: 2020 }], {}));
console.log("Expected:");
console.log("1982 -> [ { title: 'X', artist: 'Y', year: 1982, decade: '1980s' } ]");
console.log("2020 -> [ { title: 'X', artist: 'Y', year: 2020, decade: '2020s' } ]");