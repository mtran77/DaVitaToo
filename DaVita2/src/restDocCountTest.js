// This .js file is a test to check a count of how many documents are tagged with a specific tag
// this was created to run locally with node-fetch. This will not work with forge-api calls

import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

//https://miscapstones25.atlassian.net/wiki/dosearchsite.action?cql=label="test"


const CONFLUENCE_BASE_URL = 'https://miscapstones25.atlassian.net/wiki/rest/api';
const AUTH_HEADER = `Basic ${Buffer.from(`${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`).toString('base64')}`;

async function countDocumentsByTag(tag) {
    const cqlQuery = `space = "Capstone" AND label = "${tag}"`;
    const encodedCql = encodeURIComponent(cqlQuery);
    const URL = `${CONFLUENCE_BASE_URL}/content/search?cql=${encodedCql}`;

    console.log("Fetching document count from:", URL);

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': AUTH_HEADER
            }
        });

        const rawData = await response.text(); 
        console.log("Raw API Response:", rawData); 

        if (!response.ok) {
            console.error('Error fetching document count:', response.status, response.statusText);
            throw new Error(`Error fetching document count: ${response.status}`);
        }

        const data = JSON.parse(rawData);
        console.log(`Total documents found with tag "${tag}" in Capstone space:`, data.size); 
        return data.size;

    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}

countDocumentsByTag("test");