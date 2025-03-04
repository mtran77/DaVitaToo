import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'coming from index.js';
});

export const handler = resolver.getDefinitions();

//forge entry point