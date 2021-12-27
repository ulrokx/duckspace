import { Button } from "@chakra-ui/button";
import { Divider, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from 'next/link'
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

interface UserDisplayTypesProps {
    selected: string
    id: string
}

const ActiveLink = ({children, href, id}) => {
    const router = useRouter()
    return (
        <NextLink href = {`/duck/[id]/${href}`} as={`/duck/${id}/${href}`}>
        <Link fontSize = "2xl" fontWeight={router.pathname.includes(href) ? "bold" : ""}>{children}</Link>
        </NextLink>
    )
}

const tabs = [
    {href: "posts", text: "Posts"},
    {href: "comments", text: "Comments"},
    {href: "friends", text: "Friends"},
    {href: "contact", text: "Contact"}
]

const tabsAuth = [...tabs,
{href: "saved", text: "Saved"},
{href: "options", text: "Options"}
]

export const UserDisplayType: React.FC<UserDisplayTypesProps> = ({selected, id}) => {
    let display = tabs
    const router = useRouter()
    const [{data,fetching}] = useMeQuery()
    if(!fetching && data.me?.id == router.query.id) {
        display = tabsAuth

    }
    return (
        <Flex flexDirection="column" alignItems="left" p={3}>
            {[...display].map(t => {
                return (
                    <ActiveLink href = {t.href} id = {id}>{t.text}</ActiveLink>
                )
            })}
        </Flex>
    );
};
