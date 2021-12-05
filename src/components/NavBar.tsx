import { Box } from "@chakra-ui/layout";
import { Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { NavBarDropdownMenu } from "./NavBarDropdownMenu";

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
                    <Button mr={4}>login</Button>
                </NextLink>
                <NextLink href="/register">
                    <Button>register</Button>
                </NextLink>
            </>
        );
    } else {
        body = <NavBarDropdownMenu />
    }
    return (
        <Flex bg="red.300" position="sticky" top={0} zIndex={100} p={4} justifyContent="space-between" alignContent="center">
            <NextLink href="/">
                <Link fontSize="3xl" fontWeight="bold">Duckscape</Link>
            </NextLink>
            <Box>
                {body}
</Box>
        </Flex>
    );
    
};
