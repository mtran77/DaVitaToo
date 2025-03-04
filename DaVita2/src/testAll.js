// this file tests the connection between openai locally

import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Define authentication and API endpoints
const CONFLUENCE_BASE_URL = 'https://miscapstones25.atlassian.net/wiki/rest/api';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AUTH_HEADER = `Basic ${Buffer.from(`${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`).toString('base64')}`;

async function fetchConfluenceDocs() {
    const cqlQuery = encodeURIComponent('(label = "training") ORDER BY lastModified DESC');
    const url = `${CONFLUENCE_BASE_URL}/content/search?limit=2&cql=${cqlQuery}&expand=space,body.view`;

    console.log("\nFetching from Confluence:", url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': AUTH_HEADER
            }
        });

        if (!response.ok) {
            console.error("Error fetching from Confluence:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        if (data.results.length === 0) {
            console.log("No documents found with that tag.");
            return null;
        }

        // Extract and return relevant document data
        return data.results.map(doc => doc.title + ": " + (doc.body?.view?.value || 'No content')).join("\n");
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
}

async function fetchOpenAIResponse(context) {
    if (!context) {
        console.log("No context available. Skipping OpenAI request.");
        return;
    }

    const payload = {
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful assistant that summarizes documents.' },
            { role: 'user', content: `Here are some documents:\n${context}\n\nCan you summarize these? Keep it short and concise. only return 1 to 5 sentences.` }
        ]
    };

    console.log("\nSending request to OpenAI...");

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Error calling OpenAI:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log("\nOpenAI Response:\n", data.choices[0].message.content);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

// Run full test
async function testIntegration() {
    console.log("\nRunning Full Integration Test...");
    // console.log("Checking OpenAI rate limits...");
    // console.log("Headers:", response.headers.get('x-ratelimit-remaining'));
    // console.log("Reset in:", response.headers.get('x-ratelimit-reset'), "seconds");

    const docs = await fetchConfluenceDocs();
    await fetchOpenAIResponse(docs);
}

testIntegration();

