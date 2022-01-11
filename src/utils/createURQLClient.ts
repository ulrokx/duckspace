import { dedupExchange, fetchExchange, stringifyVariables } from "@urql/core";
import {
    cacheExchange,
    Data,
    Entity,
    Resolver,
} from "@urql/exchange-graphcache";
import Router from "next/router";
import { Exchange } from "urql";
import { pipe, tap } from "wonka";
import { FETCH_POST_LIMIT } from "../constants";
import {
    CreatePostMutationVariables,
    LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    MutationSavePostArgs,
    MutationUpdatePostArgs,
    PostsQuery,
    RegisterMutation,
    Saved,
    SavedDocument,
    SavedQuery,
    SavePostMutation,
    SavePostMutationVariables,
    VoteMutation,
    VoteMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import gql from "graphql-tag";
import { NextUrqlClientConfig, WithUrqlClient } from "next-urql";
import { isServer } from "./isServer";

export const errorExchange: Exchange =
    ({ forward }) =>
    (ops$) => {
        return pipe(
            forward(ops$),
            tap(({ error }) => {
                if (error) {
                    if (error.message.includes("not authenticated")) {
                        Router.replace("/login");
                    }
                }
            })
        );
    };

export type MergeMode = "before" | "after";

export interface PaginationParams {
    offsetArgument?: string;
    limitArgument?: string;
    mergeMode?: MergeMode;
}

export const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(
            (info) => info.fieldName === fieldName
        );
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }
        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)}`;
        const inCache = cache.resolve(
            cache.resolve(entityKey, fieldKey) as string,
            "posts"
        );
        info.partial = !inCache;
        const results: string[] = [];
        let hasMore = true;
        fieldInfos.forEach((f) => {
            const key = cache.resolve(entityKey, f.fieldKey) as string;
            const data = cache.resolve(key, "posts") as string[];
            const _hasMore = cache.resolve(key, "hasMore");
            if (!_hasMore) {
                hasMore = _hasMore as boolean;
            }
            results.push(...data);
        });
        return {
            __typename: "PaginatedPosts",
            hasMore: hasMore,
            posts: results,
        };
    };
};

export const createURQLClient = (ssrExchange: any, ctx: any) => {
    let cookie = "";
    if (isServer()) {
        cookie = ctx?.req.headers.cookie;
    }
    return {
        url: "http://localhost:4000/graphql",
        fetchOptions: {
            credentials: "include" as const,
            headers: cookie
                ? {
                      cookie,
                  }
                : undefined,
        },
        exchanges: [
            dedupExchange,
            cacheExchange({
                keys: {
                    PaginatedPosts: () => null,
                },
                resolvers: {
                    Query: {
                        posts: cursorPagination(),
                    },
                },
                updates: {
                    Mutation: {
                        savePost: (
                            result: SavePostMutation,
                            args,
                            cache,
                            info
                        ) => {
                            console.log("saved posts firing")
                            betterUpdateQuery<SavePostMutation, SavedQuery>(
                                cache,
                                { query: SavedDocument },
                                result,
                                (result, query) => {
                                    console.log("savedresult:", result, "savedquery:", query)
                                    const newQuery = {
                                        ...query,
                                        saved: [
                                            ...query.saved,
                                            {
                                                __typename: "Saved" as const,
                                                post: result.savePost,
                                            },
                                        ],
                                    };
                                    return newQuery
                                }
                            );
                        },
                        updatePost: (_result, args, cache, info) => {
                            const { text: newtext, id } =
                                args as MutationUpdatePostArgs;
                            cache.writeFragment(
                                gql`
                                    fragment _ on Post {
                                        text
                                        id
                                    }
                                `,
                                { id: id, text: newtext }
                            );
                        },
                        deletePost: (_result, args, cache, info) => {
                            const allFields = cache.inspectFields("Query");
                            const postFields = allFields.filter(
                                (s) => s.fieldName === "posts"
                            );
                            postFields.forEach((fi) => {
                                cache.invalidate(
                                    "Query",
                                    "posts",
                                    fi.arguments
                                );
                            });
                        },
                        vote: (_result, args, cache, info) => {
                            let { postId, value } =
                                args as VoteMutationVariables;
                            console.log("value:", value);
                            const data = cache.readFragment(
                                gql`
                                    fragment _ on Post {
                                        id
                                        points
                                        voteStatus
                                    }
                                `,
                                { id: postId } as any
                            );
                            // console.log("data: ", data)
                            if (data) {
                                let newPoints: number;
                                if (data.voteStatus == value) {
                                    newPoints = data.points - value;
                                    value = 0;
                                } else {
                                    newPoints =
                                        (data.points as number) +
                                        (!data.voteStatus ? 1 : 2) * value;
                                }
                                cache.writeFragment(
                                    gql`
                                        fragment __ on Post {
                                            points
                                            voteStatus
                                        }
                                    `,
                                    {
                                        id: postId,
                                        points: newPoints,
                                        voteStatus: value,
                                    } as any
                                );
                            }
                        },
                        createPost: (_result, args, cache, info) => {
                            const allFields = cache.inspectFields("Query");
                            const postFields = allFields.filter(
                                (s) => s.fieldName === "posts"
                            );
                            postFields.forEach((fi) => {
                                cache.invalidate(
                                    "Query",
                                    "posts",
                                    fi.arguments
                                );
                            });
                        },
                        logout: (_result, args, cache, info) => {
                            betterUpdateQuery<LogoutMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                () => ({ me: null })
                            );
                        },
                        login: (_result, args, cache, info) => {
                            betterUpdateQuery<LoginMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                (result, query) => {
                                    // console.log("result:", result, "query:", query)
                                    if (result.login.errors) {
                                        return query;
                                    } else {
                                        return {
                                            me: result.login.user,
                                        };
                                    }
                                }
                            );
                        },
                        register: (_result, args, cache, info) => {
                            betterUpdateQuery<RegisterMutation, MeQuery>(
                                cache,
                                { query: MeDocument },
                                _result,
                                (result, query) => {
                                    if (result.register.errors) {
                                        return query;
                                    } else {
                                        return {
                                            me: result.register.user,
                                        };
                                    }
                                }
                            );
                        },
                    },
                },
            }),
            errorExchange,
            ssrExchange,
            fetchExchange,
        ],
    };
};
