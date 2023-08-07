/* OGPの情報
{
    type: 'website',
    image: 'https://s3-alpha.figma.com/hub/file/3913238047/3e09af18-aa0e-4708-98cc-fe40bacd4a51-cover.png',
    url: 'https://www.figma.com/community/file/912837788133317724/Material-UI-for-Figma-(and-MUI-X)',
    description: 'Figma Community file - This is a community version of Material UI for Figma, a UI kit with handcrafted components for Figma.\n' +
      '\n' +
      'This community version covers Material UI, the components that are following the Material Design guidelines, and MUI X.\n' +
      '\n' +
      'The documentation of the kit: https://mui.com/figma/getting-started/\n' +
      '\n' +
      'For...',
    'image:width': '1920',
    'image:height': '960',
    title: 'Material UI for Figma (and MUI X) | Figma Community'
  }
*/

export type Pre = {
  type: string
  image?: string
  url?: string
  description?: string
  ['image:width']?: string
  ['image:height']?: string
  title?: string
}
