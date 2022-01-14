import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { MAX_DEPTH } from "../constants";
import { CommentResponse, GetCommentsQuery } from "../generated/graphql";

export interface CommentInfo {
    comment: CommentResponse
    depth: number
}


export const CommentCard: React.FC<CommentInfo> = ({ comment: c, depth}) => {
    if(!c) {
        return <p>loading</p>
    }
    return (
        <>
        <Box key={c.comment.id} borderWidth="1px" shadow="md" p={3} >
            <Flex>
                <Box display="flex" flexDirection="column">
                    <NextLink href={`/duck/[id]`} as={`/duck/${c.comment.creatorId}`}>
                        <Heading as={Link} fontSize="2xl">username</Heading>
                    </NextLink>
                    <Text mt={4}>{c.comment.text}</Text>
                </Box>
            </Flex>
        </Box>
        {depth <= MAX_DEPTH && c.children.length?
        <Stack pl={depth*4}>
            {c.children.map(cc => <CommentCard key={cc.comment.id} comment={cc} depth={depth+1}></CommentCard>)}
        </Stack>
 : null}
        </>
    );
};

