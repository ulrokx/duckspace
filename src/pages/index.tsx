import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { PostCard } from "../components/PostCard";
import { usePostsQuery } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";

const Index = () => {
    const [variables, setVariables] = useState({
        limit: 10,
        cursor: null as null | string,
    });
    const [{ data, fetching , error}] = usePostsQuery({
        variables: {
            limit: variables.limit,
            cursor: variables.cursor,
        },
    });

    useEffect(() => {
        console.log("variables:", variables);
    }, [variables]);

    if (!fetching && !data) {
        return <div>{error?.message}</div>;
    }

    return (
        <Layout showNav>
            <NextLink href="/create-post">
                <Link>create post</Link>
            </NextLink>
            <br />
            {!data && fetching ? (
                <div>loading</div>
            ) : (
                <Stack spacing={8} mx={3}>
                    {data!.posts.posts.map((p) =>
                        !p ? null : <PostCard post={p} />
                    )}
                </Stack>
            )}
            {data && data.posts.hasMore == true ? (
                <Flex>
                    <Button
                        isLoading={fetching}
                        m="auto"
                        my={12}
                        onClick={() => {
                            if (data.posts.posts.length > 0) {
                                setVariables({
                                    cursor: data.posts.posts[
                                        data.posts.posts.length - 1
                                    ].createdAt,
                                    limit: variables.limit,
                                });
                            }
                        }}
                    >
                        load more
                    </Button>
                </Flex>
            ) : null}
        </Layout>
    );
};

export default withUrqlClient(createURQLClient, { ssr: true })(Index);
