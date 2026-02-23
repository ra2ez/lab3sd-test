/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */

function getMusicTitlesByYear(tracks) {
    if(!Array.isArray(tracks) || tracks.length === 0)
    {
        return{};
    }

    const result = {};

    for(let track of tracks)
    {
        if(!track.year || typeof track.year !== "number")
        {
            continue;
        }

        const year = track.year;

        if(!result[year])
        {
            result[year] = [];
        }

        result[year].push(track.title);
    }


    for(let year in result)
    {
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
    if(!Array.isArray(tracks) || tracks.length === 0)
    {
        return [];
    }

    criteria = criteria || {};

    const result = [];

    for(let track of tracks)
    {
        if(!track || typeof track !== "object") continue;

        if(typeof track.title !== "string") continue;

        if(typeof track.artist !== "string") continue;

        if(typeof track.year !== "number") continue;


        let match = true;
        if(criteria.artist)
        {
            if(track.artist.toLowerCase() !== criteria.artist.toLowerCase())
            {
                match = false;
            }
        }

        if(criteria.minYear !== undefined)
        {
            if(track.year < criteria.minYear)
            {
                match = false;
            }
        }

        if(criteria.maxYear !== undefined)
        {
            if(track.year > criteria.maxYear)
            {
                match = false;
            }
        }

        if(!match) continue;

        const decadeStart = Math.floor(track.year / 10) * 10;
        const decade = decadeStart + "s";

        result.push({
            title: track.title,
            artist: track.artist,
            year: track.year,
            decade: decade




        })


    }

    return result;



}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};