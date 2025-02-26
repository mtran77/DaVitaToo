// Makes REST calls to Confluence

//-------------------------------------------------------------------------------------------------------------------------------------
//https://miscapstones25.atlassian.net/wiki/home
// import api from '@forge/api';
 
export async function searchDocumentsByTags(tags) {
    //create a confluence query lang. string from tags
    const cqlQuery = tags.map(tag => `label = "${tag}"`).join(' OR ');
    const  encodedCql = encodeURIComponent(`(${cqlQuery}) ORDER BY lastModified DESC`);
    
    //create URL (for search endpoint) - limit is 10 - then expand the body.view fields
    //change limit to 5 is run times are long 
    const URL = `https://miscapstones25.atlassian.net/wiki/rest/api/content/search?limit=10&cql=${encodedCql}&expand=space,body.view`;
    
    console.log("Fetching from Confluence:", URL)
    
    //added try for error logging purposes
    try {
        // Use forge api to fetch data
        const response = await api.fetch(URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log("Received response:", response.status, response.statusText);    

    // If the fetch fails
    if (!response.ok){
        console.error('There was an error fetching your documents from confluence:', response.status, response.statusText);
        throw new Error('there was an error fetching documents: ${response.status}');
  }

  const data = await response.json();
        console.log("Confluence Data Received:", data.results.length, "results");
        return data.results;

    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}

export async function getDocumentById(pageId) {
    const url = `https://miscapstones25.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.storage`;

    console.log(`Fetching document with ID: ${pageId}`);

    //added try for error logging purposes
    try {
        const response = await api.fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

  // if the fetch fails:
  if (!response.ok) {
    console.error('There was an error fetching your documents from confluence:', response.status, response.statusText);
    throw new Error(`there was an error fetching documents: ${response.status}`);
  }

  
        const doc = await response.json();
        console.log("Document Retrieved:", doc.title);
        return doc;

    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------


/*
// for local testing without forge tunnel command
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
const CONFLUENCE_BASE_URL = 'https://miscapstones25.atlassian.net/wiki/rest/api';
const AUTH_HEADER = `Basic ${Buffer.from(`${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`).toString('base64')}`;

export async function searchDocumentsByTags(tags) {
    const cqlQuery = tags.map(tag => `label = "${tag}"`).join(' OR ');
    const encodedCql = encodeURIComponent(`(${cqlQuery}) ORDER BY lastModified DESC`);
    
    //changed limit to 2 to lower run times
    // limit means how many documents confluence will return to us 
    const URL = `${CONFLUENCE_BASE_URL}/content/search?limit=2&cql=${encodedCql}&expand=space,body.view`;

    console.log("fetching url now:", URL);

    try {
      const response = await fetch(URL, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Authorization': `Basic ${Buffer.from(`${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`).toString('base64')}`
          },
          //signal: controller.signal
      });
  
      //clearTimeout(timeoutId);
  
      console.log("Received response:", response.status, response.statusText);

      if (!response.ok) {
          console.error('Error fetching documents:', response.status, response.statusText);
          throw new Error(`Error fetching documents: ${response.status}`);
      }

      const data = await response.json();
      console.log("content received from confluence:", data);

      return data.results;
  } catch (error) {
      console.error("Fetch failed:", error);
      throw error;
  }
}
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------
*/