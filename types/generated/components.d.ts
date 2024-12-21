import type { Schema, Struct } from '@strapi/strapi';

export interface ConfigSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_config_social_links';
  info: {
    displayName: 'socialLink';
  };
  attributes: {
    socialLiks: Schema.Attribute.Enumeration<
      ['facebook', 'github', 'twitter']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutButton extends Struct.ComponentSchema {
  collectionName: 'components_layout_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutCourseSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_course_sections';
  info: {
    displayName: 'courseSection';
    icon: 'command';
  };
  attributes: {
    annaoucement: Schema.Attribute.Text & Schema.Attribute.Required;
    course: Schema.Attribute.Relation<'oneToOne', 'api::course.course'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
    icon: 'book';
  };
  attributes: {
    callToAction: Schema.Attribute.String & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images' | 'videos'>;
    link: Schema.Attribute.Component<'layout.button', true>;
  };
}

export interface LayoutMission extends Struct.ComponentSchema {
  collectionName: 'components_layout_missions';
  info: {
    displayName: 'Mission';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    Heading: Schema.Attribute.String & Schema.Attribute.Required;
    showLogo: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface LayoutNewsLetter extends Struct.ComponentSchema {
  collectionName: 'components_layout_news_letters';
  info: {
    description: '';
    displayName: 'NewsLetter';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

export interface LayoutPageInfo extends Struct.ComponentSchema {
  collectionName: 'components_layout_page_infos';
  info: {
    displayName: 'pageInfo';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    cover: Schema.Attribute.Media<'images' | 'videos', true>;
    pageseo: Schema.Attribute.Component<'seo-information.seo', false>;
  };
}

export interface LayoutServicesPreview extends Struct.ComponentSchema {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'servicesPreview';
    icon: 'earth';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface PostPostSelection extends Struct.ComponentSchema {
  collectionName: 'components_post_post_selections';
  info: {
    displayName: 'postSelection';
    icon: 'bulletList';
  };
  attributes: {
    featuredPost: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    Heading: Schema.Attribute.String;
  };
}

export interface SeoInformationSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_information_seos';
  info: {
    displayName: 'seo';
    icon: 'globe';
  };
  attributes: {
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'config.social-link': ConfigSocialLink;
      'layout.button': LayoutButton;
      'layout.course-section': LayoutCourseSection;
      'layout.hero': LayoutHero;
      'layout.mission': LayoutMission;
      'layout.news-letter': LayoutNewsLetter;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'post.post-selection': PostPostSelection;
      'seo-information.seo': SeoInformationSeo;
    }
  }
}
