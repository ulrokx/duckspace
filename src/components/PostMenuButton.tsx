import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import { createStandaloneToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
    PostQuery,
    useDeletePostMutation,
    useMeQuery,
} from "../generated/graphql";
import { DeletePostDialog } from "./DeletePostDialog";

interface PostMenuButtonProps {
    post: PostQuery;
    onEdit: Function;
}

export const PostMenuButton: React.FC<PostMenuButtonProps> = ({
    post: p,
    onEdit,
}) => {
    const [{ data, fetching }] = useMeQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [{ fetching: dFetching }, deletePost] = useDeletePostMutation();
    const router = useRouter();

    return (
        <>
            <Menu isLazy>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    isLoading={fetching}
                >
                    Actions
                </MenuButton>
                <MenuList>
                    {data.me?.id === p.post.creator.id ? (
                        <>
                            <MenuItem
                                onClick={() => {
                                    onOpen();
                                }}
                            >
                                Delete post
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    onEdit();
                                }}
                            >
                                Edit post
                            </MenuItem>{" "}
                        </>
                    ) : null}
                    {data.me !== null ? (
                        <>
                            {" "}
                            <MenuItem>Save for later</MenuItem> <MenuDivider />
                        </>
                    ) : null}
                    <MenuItem>Copy link to clipboard</MenuItem>
                    <MenuItem>Report</MenuItem>
                </MenuList>
            </Menu>
            <DeletePostDialog
                isOpen={isOpen}
                onClose={onClose}
                fetching={dFetching}
                redAction={async () => {
                    await deletePost({ id: p.post.id });
                    const successMessage = createStandaloneToast();
                    successMessage({
                        title: "Deleted post",
                        description: "Post go poof",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    router.push("/");
                }}
            />
        </>
    );
};
