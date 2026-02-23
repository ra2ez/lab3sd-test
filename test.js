const { getMusicTitlesByYear, filterAndTransformTracks } = require('./2844961-lab3.js');

const testTracks = [
    { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
    { title: 'Starboy', artist: 'The Weeknd', year: 2016 },
    { title: 'Levitating', artist: 'Dua Lipa', year: 2021 },
    { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
];

console.log(getMusicTitlesByYear(testTracks));
console.log(filterAndTransformTracks(testTracks, { artist: 'the weeknd' }));
console.log(filterAndTransformTracks(testTracks, { minYear: 2015, maxYear: 2020 }));
console.log(filterAndTransformTracks(testTracks, {}));
