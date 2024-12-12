import { counterReducer } from '../counter/counter-store/counter.reducer';
import { CounterState } from '../counter/counter-store/counter.state';
import { postReducer } from '../posts/posts-store/posts.reducer';
import { PostsState } from '../posts/posts-store/posts.state';

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postReducer,
};
