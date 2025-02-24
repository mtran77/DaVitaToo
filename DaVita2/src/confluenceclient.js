// Makes REST calls to Confluence
/* (to run): Import function:
import { searchDocumentsByTags, getDocumentById } from './confluenceclient';
to retreive data from confluence into Forge (resolver?)
*/
import api from '@forge/api';


 //@param {Array<string>} tags
 //@returns {Promise<Array>}
 
export async function searchDocumentsByTagsTEST(tags) {
    // search by tags and most recent
    // create a confluence query lang. string from tags
    const cqlQuery = tags.map(tag => `label = "{tag}"`).join(' OR ');
    const  encodedCql = encodeURIComponent(`(${cqlQuery}) ORDER BY lastModified DESC`);
    //Create URL (for search endpoint) - limit is 10 - then expand the body.view fields
    //Change Later: https://davitacapstone.atlassian.net/wiki/home
    const URL = `https://davitacapstone.atlassian.net/wiki/rest/api/content/search?limit=10&cql=${encodedCql}&expand=space,body.view`;
    //Forge Fetch to Confluence REST API
    const response = await api.fetch(URL, {
        headers:{
            'Accept': 'application/json'
        }
    });

    // If the fetch does not work: 
    if (!response.ok){
        console.error('There was an error fetching your documents from confluence:', response.status, response.statusText);
        throw new Error('there was an error fetching documents: ${response.status}');
  }

  // Parse and return the list of results.
  const data = await response.json();
  return data.results;
}


 //@param {string} pageId
 //@returns {Promise<Object>} 

export async function getDocumentByIdTEST(pageId) {
  //build the URL to fetch a specific doc by id
  const url = `https://davitacapstone.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.view`;

  const response = await api.fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  // if the fetch failed:
  if (!response.ok) {
    console.error('There was an error fetching your documents from confluence:', response.status, response.statusText);
    throw new Error(`there was an error fetching documents: ${response.status}`);
  }

  const doc = await response.json();
  return doc;
}
