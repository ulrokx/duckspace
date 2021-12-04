import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React, { createRef, useRef } from "react";

export const DeletePostDialog = ({ isOpen, onClose, redAction, fetching }) => {
    const cancelRef = useRef();
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Delete post</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                        <Button ml={4} colorScheme="red" onClick={redAction} isLoading={fetching}>Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
