import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { PostPointsDisplay } from "./PostPointsDisplay";

export interface PostInfo {
    post: PostSnippetFragment;
}


export const PostCard: React.FC<PostInfo> = ({ post: p }) => {
    const router = useRouter();
    return (
        <Box key={p.id} borderWidth="1px" shadow="md" p={3}>
            <Flex>
                <PostPointsDisplay post={p} />
                <Box display="block">
                    <NextLink href={`/post/[id]`} as={`/post/${p.id}`}>
                        <Heading as={Link} fontSize="2xl">{p.title}</Heading>
                    </NextLink>
                    <Text>{p.creator.username}</Text>
                    <Text mt={4}>{p.textSnippet}</Text>
                </Box>
            </Flex>
        </Box>
    );
};
