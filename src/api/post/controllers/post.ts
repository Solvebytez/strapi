/**
 * post controller
 */

import { factories } from '@strapi/strapi'

import { Context } from 'koa';

interface CustomContext extends Context {
  state: {
    user?: any; // Replace 'any' with a more specific user type if available
  };
  query: {
    filters?: {
      premium?: boolean;
    };
  };
}

export default factories.createCoreController('api::post.post',({strapi })=> ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      try {
        ctx.body = 'ok';
      } catch (err) {
        ctx.body = err;
      }
    },
  
    // Method 2: Wrapping a core action (leaves core logic in place)
    // async find(ctx) {
    //   // some custom logic here
    //   ctx.query = { ...ctx.query, local: 'en' }
  
    //   // Calling the default core action
    //   const { data, meta } = await super.find(ctx);
    //   if(ctx.state.user) return { data, meta }
  
    //   // some more custom logic
    //   meta.date = Date.now()

    //   const filterPremium = data.filter((item)=>!item.permium)
  
    //   return { filterPremium, meta };
    // },

    async find(ctx:CustomContext){
      //For authenticated users
      const isParamsforNonPremium = ctx.query.filters?.premium == false;
      if(ctx.state.user || isParamsforNonPremium) return await super.find(ctx)

        console.log(ctx.query)

        //For non-authenticated users
       const publicPost = await strapi.service('api::post.post').findAllPosts(ctx.query)

       const sanitizedResults = await this.sanitizeOutput(publicPost, ctx);
       return this.transformResponse(sanitizedResults);
    },


  
    // Method 3: Replacing a core action with proper sanitization
    async findOne(ctx) {
      // validateQuery (optional)
      // to throw an error on query params that are invalid or the user does not have access to
      await this.validateQuery(ctx);
  
      // sanitizeQuery to remove any query params that are invalid or the user does not have access to
      // It is strongly recommended to use sanitizeQuery even if validateQuery is used
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi.service('api::post.post').find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
  
      return this.transformResponse(sanitizedResults, { pagination });
    },

    async likedPost(ctx){
      // Check if the user is authenticated
      if(!ctx.state.user) return ctx.throw(401, 'You are not authenticated')

        const user= ctx.state.user;
        const postId = ctx.params.id;
        const query = ctx.query

        const likedPost = await strapi.service("api::post.post").findLikedPost({
          postId, userId:user.id, query
        })

        const sanitizedResults = await this.sanitizeOutput(likedPost, ctx);
  
      return this.transformResponse(sanitizedResults);
    }
  }));
