//this document tests the search function of confluence REST API by tags
//tag list: compliance- general-medical- kidney-disease- kidney-dialysis- medical- manual- meeting_minutes- scheduling- training test testing 

import { searchDocumentsByTags } from '../confluenceclient.js';


async function test() {
  try {
    console.log("Starting test for Confluence API...");

    // adds tags you want to search
    const tags = ['training', 'general-medical'];
    const results = await searchDocumentsByTags(tags);
    // for logging
    console.log("Search Results:", JSON.stringify(results, null, 2));

  } catch (error) {
    console.error("Error fetching documents:", error);
  }
}

test();