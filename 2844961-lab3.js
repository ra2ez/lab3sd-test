/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */
function getMusicTitlesByYear(tracks) {
    if (!Array.isArray(tracks)) return {};

    const result = tracks.reduce((acc, track) => {
        if (typeof track.year !== 'number' || isNaN(track.year)) return acc;
        if (!acc[track.year]) acc[track.year] = [];
        acc[track.year].push(track.title);
        return acc;
    }, {});

    for (const year in result) {
        result[year].sort();
    }

    return result;
}

/**
 * Filters tracks by criteria and adds decade information
 * @param {Array} tracks - Array of track objects
 * @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
 * @returns {Array} - Filtered and transformed track objects
 */
function filterAndTransformTracks(tracks, criteria) {
    if (!Array.isArray(tracks)) return [];

    const { minYear, maxYear, artist } = criteria || {};

    return tracks
        .filter(track => {
            if (typeof track.year !== 'number' || isNaN(track.year)) return false;
            if (minYear !== undefined && track.year < minYear) return false;
            if (maxYear !== undefined && track.year > maxYear) return false;
            if (artist !== undefined && track.artist.toLowerCase() !== artist.toLowerCase()) return false;
            return true;
        })
        .map(track => {
            const decade = Math.floor(track.year / 10) * 10;
            const decadeString = `${decade}s`;
            return {
                title: track.title,
                artist: track.artist,
                year: track.year,
                decade: decadeString
            };
        });
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};
