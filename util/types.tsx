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

export type Book = {
  id: string;
  book_url: string;
  avg_rating: string;
  num_ratings: string;
  num_pages: string;
  rating: number;
  review: string;
  title: string;
  author: string;
  author_url: string;
  date_read: string;
  shelf: string;
  cover_image_url: string;
};

export type ShelfParam = {
  params: {
    shelf: string;
  };
};
