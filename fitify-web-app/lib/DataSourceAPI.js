//conecting to Contentful from example project


// static queryContentful(query, variables = {}) {
//     const requestHeaders = {
//         Authorization: `Bearer ${
//             variables?.preview
//                 ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
//                 : process.env.CONTENTFUL_ACCESS_TOKEN
//         }`,
//     };

//     try {
//         return graphQLClient.request(query, variables, requestHeaders);
//     } catch (error) {
//         throw new Error('Could not fetch data from Contentful!');
//     }
// }

// static async getPosts({ preview = false } = {}) {
//     const query = gql`
//         query getPosts($preview: Boolean!) {
//             blogPostCollection(preview: $preview, order: date_DESC) {
//                 posts: items {
//                     sys {
//                         id
//                     }
//                     title
//                     slug
//                     heroImage {
//                         url
//                         title
//                     }
//                     date
//                     author {
//                         fullName
//                     }
//                     excerpt
//                     content
//                     tags
//                 }
//             }
//         }
//     `;

//     const variables = { preview };
//     const response = await this.queryContentful(query, variables);
//     const { posts } = response?.blogPostCollection;

//     return posts;
// }

// static async getPost({ slug, preview = false } = {}) {
//     const query = gql`
//         query getPost($slug: String!, $preview: Boolean!) {
//             blogPostCollection(
//                 preview: $preview
//                 where: { slug: $slug }
//                 order: date_DESC
//             ) {
//                 posts: items {
//                     title
//                     slug
//                     heroImage {
//                         url
//                         title
//                     }
//                     date
//                     author {
//                         fullName
//                     }
//                     content
//                     tags
//                 }
//             }
//         }
//     `;

//     const variables = { slug, preview };
//     const response = await this.queryContentful(query, variables);
//     const post = response?.blogPostCollection?.posts?.pop();

//     return post;
// }

// static async getSlugs({ preview = false } = {}) {
//     const query = gql`
//         query getSlugs($preview: Boolean!) {
//             blogPostCollection(preview: $preview) {
//                 posts: items {
//                     slug
//                 }
//             }
//         }
//     `;

//     const variables = { preview };
//     const response = await this.queryContentful(query, variables);
//     const { posts } = response?.blogPostCollection;
//     const slugs = posts.map((post) => post.slug);

//     return slugs;
// }