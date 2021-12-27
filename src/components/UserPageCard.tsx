import { Box, Heading, Flex, Badge, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { GetUserQuery, useMeQuery } from '../generated/graphql';
import { useIsMe } from '../utils/useIsMe';


export const UserPageCard: React.FC<GetUserQuery> = ({getUser: user}) => {
    const router = useRouter()
    const [{fetching, data}] = useMeQuery()
    let isMe = false
    if (!fetching && data.me?.id === router.query.id) {
        isMe = true
    }
        return (
                <Box shadow="md" borderWidth="1px" p={3} mb={4} top="55">
                    <Heading mb={3} fontSize="4xl">
                        {user.username}
                    </Heading>
                    <Flex flexDirection="row" sx={{ gap: "2em" }}>
                        <Badge fontSize="l">Posts: {user.posts.length}</Badge>
                        {/* <Badge fontSize="l">Comments: {user.posts?.comments}</Badge> */}
                        <Badge fontSize="l">
                            Total Quacks: {user?.accQuacks ? user.accQuacks : 0}
                        </Badge>
                    </Flex>
                    <Text mt={3} textColor={user.about ? "black" : "grey"}>
                        {user.about
                            ? user.about
                            : isMe
                            ? "you have not created a bio yet..."
                            : "this user has not created a bio yet..."}
                    </Text>
                </Box>
        );
}