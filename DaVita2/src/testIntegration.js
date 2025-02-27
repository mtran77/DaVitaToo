//This test tests openais ability to find relevant tags and return a response based on the tags it picked 
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import readline from 'readline';

dotenv.config();

const CONFLUENCE_BASE_URL = 'https://miscapstones25.atlassian.net/wiki/rest/api';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AUTH_HEADER = `Basic ${Buffer.from(`${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`).toString('base64')}`;

// predefined list of tags. 
//https://miscapstones25.atlassian.net/wiki/labels/listlabels-alphaview.action
const availableTags = [
    "training", "compliance", "general-medical", "kidney-disease", 
    "kidney-dialysis", "medical-manual", "meeting_minutes", "scheduling"
];

//prompt user to question
function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(query, answer => {
        rl.close();
        resolve(answer);
    }));
}

//send question to openai to get relevant tags
async function determineRelevantTags(question) {
    const payload = {
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Given a user question, return the most relevant tags from the provided list. Respond with a comma-separated list of tag names only.' },
            { role: 'user', content: `User question: "${question}"\nAvailable tags: ${availableTags.join(", ")}\nWhich tags are relevant?` }
        ]
    };

    console.log("Sending request to OpenAI to determine relevant tags");

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
            return [];
        }

        const data = await response.json();
        const extractedTags = data.choices[0].message.content.split(",").map(tag => tag.trim());
        console.log("Relevant tags identified:", extractedTags);
        return extractedTags.filter(tag => availableTags.includes(tag));
    } catch (error) {
        console.error("Fetch failed:", error);
        return [];
    }
}

//fetch tagged documents from confluence 
async function fetchConfluenceDocs(tags) {
    if (tags.length === 0) {
        // if no tags, end
        console.log("No tags were identified. Skipping Confluence request.");
        return null;
    }

    //building our query in cql
    const cqlQuery = tags.map(tag => `label = "${tag}"`).join(' OR ');
    const encodedCql = encodeURIComponent(`(${cqlQuery}) ORDER BY lastModified DESC`);
    const url = `${CONFLUENCE_BASE_URL}/content/search?limit=2&cql=${encodedCql}&expand=space,body.view`;

    console.log("Fetching from Confluence:", url);

    try {
        // send request to confluence 
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': AUTH_HEADER
            }
        });

        if (!response.ok) {
            // if error return null
            console.error("Error fetching from Confluence:", response.status, response.statusText);
            return null;
        }

        const data = await response.json();
        if (data.results.length === 0) {
            console.log("No documents found for the selected tags. Test Ending now.");
            return null;
        }

        //extract data from docs and return
        return data.results.map(doc => doc.title + ": " + (doc.body?.view?.value || 'No content')).join("\n");
    } catch (error) {
        console.error("Fetch failed:", error);
        return null;
    }
}

//begin sending docs + question back to openai
async function fetchOpenAIResponse(question, context) {
    if (!context) {
        console.log("No relevant documents found. Skipping OpenAI response.");
        // if no docs found, end 
        return;
    }
    //prompting of ai
    const payload = {
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful assistant providing clear answers based on provided documents only.' },
            { role: 'user', content: `User question: "${question}"\n\nRelevant documents:\n${context}\n\nProvide a short and concise answer based only on these documents. Supply the title and source of all documents you were given to form this answer.` }
        ]
    };

    console.log("Sending request to OpenAI for final response");

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
        console.log("Final Answer from OpenAI:\n", data.choices[0].message.content);
    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

//runs full script
async function testIntegration() {
    console.log("Running Full Integration Test...");

    //question prompt
    const userQuestion = await askQuestion("Enter your question: ");

    //determine tags
    const relevantTags = await determineRelevantTags(userQuestion);
    if (relevantTags.length === 0) {
        console.log("Test ended: No relevant tags found.");
        return;
    }

    //fetch our docs from confluence
    const docs = await fetchConfluenceDocs(relevantTags);
    if (!docs) {
        console.log("Test ended: No relevant documents found.");
        return;
    }

    //final response
    await fetchOpenAIResponse(userQuestion, docs);
}

testIntegration();