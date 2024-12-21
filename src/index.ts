// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap( { strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models:["admin::user"],
      afterCreate:async({result})=>{
        console.log("result",result)

        const {id, firstname, lastname, email,username, createdAt,updatedAt}=result;
        await strapi.service("api::author.author").create({
          data:{
            Firstname:firstname,Lastname:lastname,username, email, createdAt, updatedAt, admin_user:[id]
          }
        })

      },
      afterUpdate:async({result})=>{
          const conrespondingAuthor=(
            await strapi.entityService.findMany("api::author.author",{
              populate:["admin_user"],
              filters:{
                admin_user:{id:result.id}
              }
            })
          )[0];
          
      }
    })
  },
};
