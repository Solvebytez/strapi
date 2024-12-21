/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', ({ strapi }) => ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args: any[]) {
    let response = { okay: true }

    if (response.okay === false) {
      return { response, error: true }
    }

    return response
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args: any[]) {  
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach((result: { counter: number; }) => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Custom method to find all posts
  async findAllPosts(...arg: any) {
    const newQuery = {
      ...arg,
      filters: {
        ...arg.filters,
        premium: false
      }
    }

    const allPosts = await  super.find(newQuery);
    console.log("allPosts",newQuery)
    return allPosts
  },

  // Helper method to get fetch parameters
  getFetchParams(query: any) {
    // Implement the logic to transform the query into the format expected by strapi.entityService.findMany
    // This is a basic implementation. Adjust it based on your specific requirements.
    return {
      fields: query.fields,
      filters: query.filters,
      populate: query.populate,
      sort: query.sort,
      start: query.start,
      limit: query.limit,
    };
  },

async findLikedPost(args:any){
  const {postId:documentId,userId,query}=args;

  const postToLike = await super.findOne(documentId, {
    populate: ["liked"]
  });

  console.log("postToLike",postToLike)
  // Check if user liked the post
  const document = await super.update(documentId,{ data:
    {
      liked: [...postToLike.liked,userId]
    }
    ,...query
  });
  return document;
}

  
}));

