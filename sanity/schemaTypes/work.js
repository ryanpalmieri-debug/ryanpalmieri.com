export const work = {
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this project to the top of the work grid',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use to manually order projects.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Strategy & Brand', value: 'Strategy & Brand' },
          { title: 'Film & Production', value: 'Film & Production' },
          { title: 'Campaigns & Partnerships', value: 'Campaigns & Partnerships' },
          { title: 'Branded Content', value: 'Branded Content' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Your specific role on this project',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description: 'Short project description shown on hover',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full project description shown on the detail page',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      description: 'Main cover image for the work grid card',
      validation: Rule => Rule.required(),
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional project images (up to 3)',
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional video link (Vimeo, YouTube, etc.)',
    },
    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'Optional external link to the live project',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'thumbnail',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }, { field: 'year', direction: 'desc' }],
    },
  ],
}
