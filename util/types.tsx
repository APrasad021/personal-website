export type PageData = {
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: { html: string };
};

export type PostData = {
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: { html: string };
};

export type PostsConnectionData = {
  node: {
    slug: string;
    createdAt: string;
    title: string;
    content: { html: string };
  };
};

export type PostsConnections = {
  posts: [post: PostsConnectionData];
};

export type SlugParam = {
  params: {
    slug: string;
  };
};
