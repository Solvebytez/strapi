/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post',{
    // config:{
    //     find:{
    //         policies:["is-admin"]
    //     }
    // }
});
