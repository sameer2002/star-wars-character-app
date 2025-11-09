/**
 * @typedef {Object} Character
 * @property {string} name
 * @property {string} height
 * @property {string} mass
 * @property {string} hair_color
 * @property {string} skin_color
 * @property {string} eye_color
 * @property {string} birth_year
 * @property {string} gender
 * @property {string} homeworld
 * @property {string[]} films
 * @property {string[]} species
 * @property {string[]} vehicles
 * @property {string[]} starships
 * @property {string} created
 * @property {string} edited
 * @property {string} url
 */

/**
 * @typedef {Object} Homeworld
 * @property {string} name
 * @property {string} rotation_period
 * @property {string} orbital_period
 * @property {string} diameter
 * @property {string} climate
 * @property {string} gravity
 * @property {string} terrain
 * @property {string} surface_water
 * @property {string} population
 * @property {string[]} residents
 * @property {string[]} films
 * @property {string} created
 * @property {string} edited
 * @property {string} url
 */

/**
 * @typedef {Object} Species
 * @property {string} name
 * @property {string} classification
 * @property {string} designation
 * @property {string} average_height
 * @property {string} skin_colors
 * @property {string} hair_colors
 * @property {string} eye_colors
 * @property {string} average_lifespan
 * @property {string} homeworld
 * @property {string} language
 * @property {string[]} people
 * @property {string[]} films
 * @property {string} created
 * @property {string} edited
 * @property {string} url
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated
 * @property {string|null} token
 * @property {{username: string}|null} user
 */

export { };