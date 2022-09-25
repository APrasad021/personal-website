import { gql } from "@apollo/client";

export const GET_PAGE_QUERY = gql`
query GetPage($slug: String!) {
    page(where: {slug: $slug}) {
      publishedAt
      updatedAt
      title
      content {
        html
      }
    }
  }
`

export const GET_PAGES = gql`
query GetPages {
  pages {
    slug
  }
}
`;

export const GET_POSTS = gql`
query GetPosts {
    postsConnection(orderBy: createdAt_DESC) {
      edges {
        node {
          slug
          createdAt
          title
        }
      }
    }
  }
`;

export const GET_POSTS_SLUGS = gql`
query GetPosts {
    postsConnection(orderBy: createdAt_DESC) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_POST = gql`
query GetPost($slug: String!) {
    post(where: {slug: $slug}) {
      publishedAt
      createdAt
      updatedAt
      content {
        html
      }
      title
    }
  }
`;