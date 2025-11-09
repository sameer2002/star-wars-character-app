const speciesColors = {
    human: 'bg-blue-500',
    droid: 'bg-yellow-500',
    wookiee: 'bg-amber-700',
    gungan: 'bg-green-500',
    ewok: 'bg-orange-600',
    "yoda's species": 'bg-green-700',
    hutt: 'bg-red-600',
    "twi'lek": 'bg-purple-500',
};

/**
 * Get color for species
 * @param {string} speciesName - Species name
 * @returns {string} Tailwind color class
 */
export const getSpeciesColor = (speciesName) => {
    const lower = speciesName.toLowerCase();
    return speciesColors[lower] || 'bg-indigo-500';
};

/**
 * Format date to dd-MM-yyyy
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};