const { getMusicTitlesByYear, filterAndTransformTracks } = require('./2844961-lab3.js');

let passed = 0;
let failed = 0;

function test(description, actual, expected) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) {
        console.log('✅ PASS:', description);
        passed++;
    } else {
        console.log('❌ FAIL:', description);
        console.log('   Got:     ', JSON.stringify(actual));
        console.log('   Expected:', JSON.stringify(expected));
        failed++;
    }
}

// ============================================
// getMusicTitlesByYear Tests
// ============================================
console.log('\n===== getMusicTitlesByYear =====\n');

// 1. Basic grouping
test('Basic: multiple tracks across different years',
    getMusicTitlesByYear([
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
        { title: 'Levitating', artist: 'Dua Lipa', year: 2021 },
    ]),
    { 1982: ['Thriller'], 2020: ['Blinding Lights'], 2021: ['Levitating'] }
);

// 2. Multiple tracks same year
test('Same year: multiple tracks in 2020',
    getMusicTitlesByYear([
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
        { title: 'Save Your Tears', artist: 'The Weeknd', year: 2020 },
        { title: 'Levitating', artist: 'Dua Lipa', year: 2021 },
    ]),
    { 2020: ['Blinding Lights', 'Save Your Tears'], 2021: ['Levitating'] }
);

// 3. Alphabetical sorting
test('Sorting: titles sorted A-Z within year',
    getMusicTitlesByYear([
        { title: 'Zebra', artist: 'Artist', year: 2020 },
        { title: 'Apple', artist: 'Artist', year: 2020 },
        { title: 'Mango', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Apple', 'Mango', 'Zebra'] }
);

// 4. Empty array
test('Empty: empty input returns {}',
    getMusicTitlesByYear([]),
    {}
);

// 5. Missing year
test('Invalid: missing year property skipped',
    getMusicTitlesByYear([
        { title: 'No Year', artist: 'Artist' },
        { title: 'Has Year', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Has Year'] }
);

// 6. Non-numeric year string
test('Invalid: year "twenty twenty" skipped',
    getMusicTitlesByYear([
        { title: 'Bad Year', artist: 'Artist', year: 'twenty twenty' },
        { title: 'Good Year', artist: 'Artist', year: 2021 },
    ]),
    { 2021: ['Good Year'] }
);

// 7. All invalid
test('All invalid tracks returns {}',
    getMusicTitlesByYear([
        { title: 'No Year', artist: 'Artist' },
        { title: 'Bad Year', artist: 'Artist', year: 'twenty twenty' },
    ]),
    {}
);

// 8. Missing title skipped
test('Missing title skipped',
    getMusicTitlesByYear([
        { artist: 'Artist', year: 2020 },
        { title: 'Valid', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Valid'] }
);

// 9. Missing artist skipped
test('Missing artist skipped',
    getMusicTitlesByYear([
        { title: 'No Artist', year: 2020 },
        { title: 'Valid', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Valid'] }
);

// 10. Single track
test('Single track',
    getMusicTitlesByYear([{ title: 'Only Song', artist: 'Artist', year: 1999 }]),
    { 1999: ['Only Song'] }
);

// 11. Year as string number (e.g. "2020")
test('Invalid: year as string "2020" skipped',
    getMusicTitlesByYear([
        { title: 'String Year', artist: 'Artist', year: '2020' },
        { title: 'Valid', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Valid'] }
);

// 12. Year as float
test('Year as float 2020.5 - still a number, included',
    getMusicTitlesByYear([{ title: 'Float Year', artist: 'Artist', year: 2020.5 }]),
    { 2020.5: ['Float Year'] }
);

// 13. null track in array
test('null entry in array skipped',
    getMusicTitlesByYear([
        null,
        { title: 'Valid', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Valid'] }
);

// 14. Many years
test('Many different years grouped correctly',
    getMusicTitlesByYear([
        { title: 'Song 90s', artist: 'Artist', year: 1995 },
        { title: 'Song 00s', artist: 'Artist', year: 2005 },
        { title: 'Song 10s', artist: 'Artist', year: 2015 },
        { title: 'Song 20s', artist: 'Artist', year: 2020 },
    ]),
    { 1995: ['Song 90s'], 2005: ['Song 00s'], 2015: ['Song 10s'], 2020: ['Song 20s'] }
);

// 15. Case-sensitive title sorting (uppercase before lowercase)
test('Sorting: uppercase titles sort before lowercase',
    getMusicTitlesByYear([
        { title: 'banana', artist: 'Artist', year: 2020 },
        { title: 'Apple', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Apple', 'banana'] }
);

// 16. Duplicate titles same year
test('Duplicate titles in same year both included',
    getMusicTitlesByYear([
        { title: 'Same Song', artist: 'Artist A', year: 2020 },
        { title: 'Same Song', artist: 'Artist B', year: 2020 },
    ]),
    { 2020: ['Same Song', 'Same Song'] }
);

// 17. year = null
test('Invalid: year = null skipped',
    getMusicTitlesByYear([
        { title: 'Null Year', artist: 'Artist', year: null },
        { title: 'Valid', artist: 'Artist', year: 2020 },
    ]),
    { 2020: ['Valid'] }
);

// 18. year = undefined
test('Invalid: year = undefined skipped',
    getMusicTitlesByYear([
        { title: 'Undefined Year', artist: 'Artist', year: undefined },
        { title: 'Valid', artist: 'Artist', year: 2021 },
    ]),
    { 2021: ['Valid'] }
);

// 19. year = NaN
test('Invalid: year = NaN skipped',
    getMusicTitlesByYear([
        { title: 'NaN Year', artist: 'Artist', year: NaN },
        { title: 'Valid', artist: 'Artist', year: 2021 },
    ]),
    { 2021: ['Valid'] }
);

// 20. year = boolean
test('Invalid: year = true skipped',
    getMusicTitlesByYear([
        { title: 'Bool Year', artist: 'Artist', year: true },
        { title: 'Valid', artist: 'Artist', year: 2022 },
    ]),
    { 2022: ['Valid'] }
);

// ============================================
// filterAndTransformTracks Tests
// ============================================
console.log('\n===== filterAndTransformTracks =====\n');

const mainTracks = [
    { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
    { title: 'Starboy', artist: 'The Weeknd', year: 2016 },
    { title: 'Levitating', artist: 'Dua Lipa', year: 2021 },
    { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
];

// 1. No filter
test('No filter: returns all tracks with decade',
    filterAndTransformTracks(mainTracks, {}),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
        { title: 'Levitating', artist: 'Dua Lipa', year: 2021, decade: '2020s' },
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982, decade: '1980s' },
    ]
);

// 2. minYear only
test('minYear only: { minYear: 2000 }',
    filterAndTransformTracks(mainTracks, { minYear: 2000 }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
        { title: 'Levitating', artist: 'Dua Lipa', year: 2021, decade: '2020s' },
    ]
);

// 3. maxYear only
test('maxYear only: { maxYear: 2019 }',
    filterAndTransformTracks(mainTracks, { maxYear: 2019 }),
    [
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982, decade: '1980s' },
    ]
);

// 4. Year range
test('Year range: { minYear: 2015, maxYear: 2020 }',
    filterAndTransformTracks(mainTracks, { minYear: 2015, maxYear: 2020 }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 5. Artist lowercase
test('Artist filter: "the weeknd" lowercase',
    filterAndTransformTracks(mainTracks, { artist: 'the weeknd' }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 6. Artist uppercase
test('Artist filter: "THE WEEKND" uppercase',
    filterAndTransformTracks(mainTracks, { artist: 'THE WEEKND' }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 7. Artist mixed case
test('Artist filter: "tHe WeEkNd" mixed case',
    filterAndTransformTracks(mainTracks, { artist: 'tHe WeEkNd' }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 8. Combined minYear + artist
test('Combined: { minYear: 2015, artist: "The Weeknd" }',
    filterAndTransformTracks(mainTracks, { minYear: 2015, artist: 'The Weeknd' }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 9. Combined maxYear + artist
test('Combined: { maxYear: 2018, artist: "The Weeknd" }',
    filterAndTransformTracks(mainTracks, { maxYear: 2018, artist: 'The Weeknd' }),
    [
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 10. Combined all three
test('Combined: { minYear: 2016, maxYear: 2020, artist: "The Weeknd" }',
    filterAndTransformTracks(mainTracks, { minYear: 2016, maxYear: 2020, artist: 'The Weeknd' }),
    [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020, decade: '2020s' },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016, decade: '2010s' },
    ]
);

// 11. No matches minYear
test('No matches: { minYear: 3000 } returns []',
    filterAndTransformTracks(mainTracks, { minYear: 3000 }),
    []
);

// 12. No matches artist
test('No matches: { artist: "Adele" } returns []',
    filterAndTransformTracks(mainTracks, { artist: 'Adele' }),
    []
);

// 13. No matches maxYear
test('No matches: { maxYear: 1900 } returns []',
    filterAndTransformTracks(mainTracks, { maxYear: 1900 }),
    []
);

// 14. Empty array
test('Empty array returns []',
    filterAndTransformTracks([], {}),
    []
);

// 15. Decade 1982 -> 1980s
test('Decade: 1982 -> "1980s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 1982 }], {})[0].decade,
    '1980s'
);

// 16. Decade 1995 -> 1990s
test('Decade: 1995 -> "1990s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 1995 }], {})[0].decade,
    '1990s'
);

// 17. Decade 2005 -> 2000s
test('Decade: 2005 -> "2000s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2005 }], {})[0].decade,
    '2000s'
);

// 18. Decade 2016 -> 2010s
test('Decade: 2016 -> "2010s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2016 }], {})[0].decade,
    '2010s'
);

// 19. Decade 2020 -> 2020s
test('Decade: 2020 -> "2020s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2020 }], {})[0].decade,
    '2020s'
);

// 20. Decade 2010 -> 2010s (boundary)
test('Decade boundary: 2010 -> "2010s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2010 }], {})[0].decade,
    '2010s'
);

// 21. Decade 2019 -> 2010s (boundary)
test('Decade boundary: 2019 -> "2010s"',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2019 }], {})[0].decade,
    '2010s'
);

// 22. minYear inclusive boundary
test('minYear inclusive: year exactly equals minYear included',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2015 }], { minYear: 2015 }),
    [{ title: 'X', artist: 'Y', year: 2015, decade: '2010s' }]
);

// 23. maxYear inclusive boundary
test('maxYear inclusive: year exactly equals maxYear included',
    filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2020 }], { maxYear: 2020 }),
    [{ title: 'X', artist: 'Y', year: 2020, decade: '2020s' }]
);

// 24. Invalid track mixed with valid
test('Invalid tracks mixed with valid skipped',
    filterAndTransformTracks([
        { title: 'Valid', artist: 'Artist', year: 2020 },
        { title: 'No Year', artist: 'Artist' },
        { title: 'Bad Year', artist: 'Artist', year: 'twenty twenty' },
        null,
    ], {}),
    [{ title: 'Valid', artist: 'Artist', year: 2020, decade: '2020s' }]
);

// 25. Output has exactly 4 fields
test('Output object has exactly title, artist, year, decade',
    Object.keys(filterAndTransformTracks([{ title: 'X', artist: 'Y', year: 2020 }], {})[0]).sort(),
    ['artist', 'decade', 'title', 'year']
);

// ============================================
// Summary
// ============================================
console.log('\n===== RESULTS =====');
console.log('Passed:', passed);
console.log('Failed:', failed);
console.log('Total: ', passed + failed);
