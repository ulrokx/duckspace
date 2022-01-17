import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  parentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CommentInput = {
  parentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  children: Array<CommentResponse>;
  comment: Comment;
  hasMore: Scalars['Boolean'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  changePassword: UserResponse;
  createPost: Post;
  deleteComment?: Maybe<Comment>;
  deletePost: Scalars['Boolean'];
  fixComments: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  savePost?: Maybe<Post>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<Post>;
  vote: Scalars['Boolean'];
};


export type MutationAddCommentArgs = {
  input: CommentInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSavePostArgs = {
  postId: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationVoteArgs = {
  postId: Scalars['String'];
  value: Scalars['Int'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  creatorId: Scalars['String'];
  id: Scalars['String'];
  points: Scalars['Float'];
  savedStatus?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<CommentResponse>;
  getQuacks: Scalars['Int'];
  getUser: User;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
  saved: Array<Saved>;
};


export type QueryGetCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryGetQuacksArgs = {
  uuid: Scalars['String'];
};


export type QueryGetUserArgs = {
  uuid: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Saved = {
  __typename?: 'Saved';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  accQuacks?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  posts: Array<Post>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CommentFieldsFragment = { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined };

export type CommentRespFragment = { __typename?: 'CommentResponse', hasMore: boolean, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } };

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, voteStatus?: number | null | undefined, creator?: { __typename?: 'User', username: string, id: string } | null | undefined };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined } };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, text: string, createdAt: string, creatorId: string, updatedAt: string, points: number } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, username: string } | null | undefined } };

export type SavePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost?: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, voteStatus?: number | null | undefined, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } | null | undefined };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  text: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', text: string, title: string, creatorId: string, updatedAt: string } | null | undefined };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'CommentResponse', hasMore: boolean, children: Array<{ __typename?: 'CommentResponse', hasMore: boolean, children: Array<{ __typename?: 'CommentResponse', hasMore: boolean, children: Array<{ __typename?: 'CommentResponse', hasMore: boolean, children: Array<{ __typename?: 'CommentResponse', hasMore: boolean, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }>, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }>, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }>, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }>, comment: { __typename?: 'Comment', id: string, createdAt: string, updatedAt: string, text: string, creatorId: string, parentId?: string | null | undefined, postId: string, isDeleted: boolean, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }> };

export type GetUserQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', username: string, updatedAt: string, createdAt: string, id: string, about?: string | null | undefined, accQuacks?: number | null | undefined, posts: Array<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, voteStatus?: number | null | undefined, creator?: { __typename?: 'User', username: string, id: string } | null | undefined }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string } | null | undefined };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, voteStatus?: number | null | undefined, title: string, text: string, savedStatus?: string | null | undefined, points: number, creator?: { __typename?: 'User', id: string, username: string } | null | undefined } | null | undefined };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, voteStatus?: number | null | undefined, creator?: { __typename?: 'User', username: string, id: string } | null | undefined }> } };

export type SavedQueryVariables = Exact<{ [key: string]: never; }>;


export type SavedQuery = { __typename?: 'Query', saved: Array<{ __typename?: 'Saved', post: { __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, points: number, textSnippet: string, voteStatus?: number | null | undefined, creator?: { __typename?: 'User', username: string, id: string } | null | undefined } }> };

export const CommentFieldsFragmentDoc = gql`
    fragment CommentFields on Comment {
  id
  createdAt
  updatedAt
  text
  creatorId
  creator {
    username
    id
  }
  parentId
  postId
  isDeleted
}
    `;
export const CommentRespFragmentDoc = gql`
    fragment CommentResp on CommentResponse {
  comment {
    ...CommentFields
  }
  hasMore
}
    ${CommentFieldsFragmentDoc}`;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  points
  textSnippet
  voteStatus
  creator {
    username
    id
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    text
    createdAt
    creatorId
    updatedAt
    points
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SavePostDocument = gql`
    mutation SavePost($postId: String!) {
  savePost(postId: $postId) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function useSavePostMutation() {
  return Urql.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $text: String!) {
  updatePost(id: $id, text: $text) {
    text
    title
    creatorId
    updatedAt
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: String!) {
  vote(value: $value, postId: $postId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const GetCommentsDocument = gql`
    query GetComments($postId: String!) {
  getComments(postId: $postId) {
    ...CommentResp
    children {
      ...CommentResp
      children {
        ...CommentResp
        children {
          ...CommentResp
          children {
            ...CommentResp
          }
        }
      }
    }
  }
}
    ${CommentRespFragmentDoc}`;

export function useGetCommentsQuery(options: Omit<Urql.UseQueryArgs<GetCommentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCommentsQuery>({ query: GetCommentsDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($uuid: String!) {
  getUser(uuid: $uuid) {
    username
    updatedAt
    createdAt
    id
    about
    accQuacks
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    voteStatus
    title
    text
    savedStatus
    creator {
      id
      username
    }
    points
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const SavedDocument = gql`
    query Saved {
  saved {
    post {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

export function useSavedQuery(options: Omit<Urql.UseQueryArgs<SavedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SavedQuery>({ query: SavedDocument, ...options });
};