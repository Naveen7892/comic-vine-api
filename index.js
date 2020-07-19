let fetch = require('node-fetch');

let base_url = 'https://comicvine.gamespot.com/api';
let format = 'json';
let field_list = "id,name,deck,image,real_name,api_detail_url";

let comicVineAPI = {
    /**
     * Returns  recently updated characters list.
     *
     * @param {number} offset Defaults to 0.
     * @param {number} limit Defaults to 10
     * @param {string} query search string. [Eg: "Iron Man"]
     * @param {number} filterFieldType Filter by field. Supported: Name, Gender, Any.
     * @return {Promise<object>} A promise of list of Characters upto limit count and only with default fields
     */
    getRecentlyUpdatedCharacters: function(offset = 0, limit = 10, query="", filterFieldType = "") {
        let url = "";
        // console.log(offset, limit, field_list, query, filterFieldType);
        if (query && (!filterFieldType || filterFieldType == "Any")) {
            url = `${base_url}/search?format=${format}&sort=date_last_updated:desc&offset=${offset}&limit=${limit}&field_list=${field_list}&query=${query}&resources=character`;
            } else {
            if (filterFieldType == "Name") {
                url = `${base_url}/characters?format=${format}&sort=date_last_updated:desc&offset=${offset}&limit=${limit}&field_list=${field_list}&filter=name:${query}`;
            } else if (filterFieldType == "Gender") {
                url = `${base_url}/characters?format=${format}&sort=date_last_updated:desc&offset=${offset}&limit=${limit}&field_list=${field_list}&filter=gender:${query}`;
            } else {
                url = `${base_url}/characters?format=${format}&sort=date_last_updated:desc&offset=${offset}&limit=${limit}&field_list=${field_list}`;
            }
        }
        return fetch(url);
    },

    /**
     * 
     * @param {number} id Id of the character
     * @return {Promise<object>} A promise with details of Character with all fields.
     */
    getCharacterById: function(id) {
        let url = `${base_url}/characters?format=${format}&filter=id:${id}&field_list=${field_list}`;
        return fetch(tmp);
    }
}

module.exports = comicVineAPI;