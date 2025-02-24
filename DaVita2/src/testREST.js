//for testing confluenceclient.js purposes


import { searchDocumentsByTags } from './confluenceclient';

export async function run(request) {
  try {
    // compliance- general-medical- kidney-disease- kidney-dialysis- medical- manual- meeting_minutes- scheduling- training 


    const results = await searchDocumentsByTags(['training', 'general-medical']);
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString()
    };
  }
}
