import { Post } from '../../models/post.model';

export interface PostsState {
  posts: Post[];
}

export const initalState: PostsState = {
  posts: [],
};
