import { Box } from "@chakra-ui/layout";
import { Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const NavBar: React.FC = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;

    if (fetching) {
        //user is loading
        body = null;
    } else if (!data?.me) {
        //user is not logged in
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={4}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        );
    } else {
        //user is logged in
        body = (
            <Flex>
                <Box>{data.me.username}</Box>
                <Button
                    variant="link"
                    ml={4}
                    onClick={() => {
                        logout();
                    }}
                    isLoading={logoutFetching}
                >
                    logout
                </Button>
            </Flex>
        );
    }

    return (
        <Flex bg="teal" position="sticky" top={0} zIndex={100} p={4}>
            <NextLink href="/">
                <Link>home</Link>
            </NextLink>
            <Box ml="auto">{body}</Box>
        </Flex>
    );
};
