export interface Post {
  id: number;
  title: string;
  description: string;
}

export interface PostsState {
  posts: Post[];
}

export const initalState: PostsState = {
  posts: [
    {
      id: 1,
      title: 'title-1',
      description: 'description 1',
    },
    {
      id: 2,
      title: 'title-2',
      description: 'description 2',
    },
  ],
};
