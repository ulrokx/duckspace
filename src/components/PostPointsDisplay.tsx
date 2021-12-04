import { Button } from "@chakra-ui/button";
import { Badge, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { GiPlasticDuck, GiRattlesnake } from "react-icons/gi";
import { PostQuery, PostsQuery, useVoteMutation } from "../generated/graphql";
import { Override } from "../utils/typeOverwrite";
import { PostInfo } from "./PostCard";

type QuackLoadingType = "upLoading" | "downLoading" | "notLoading";

type PostQueryOpt = Override<PostQuery, {text?: string}>

export const PostPointsDisplay: React.FC<PostQuery> = ({post: p}) => {
    const [loadingStatus, setLoadingStatus] =
        useState<QuackLoadingType>("notLoading");
    const [{}, vote] = useVoteMutation(); 
    return (
        <Flex direction="column" mr={8} align="center" >
            <Button
                onClick={async () => {
                    setLoadingStatus("upLoading");
                    await vote({ value: 1, postId: p.id });
                    setLoadingStatus("notLoading");
                }}
                isLoading={loadingStatus === "upLoading"}
                color={p.voteStatus === 1 ? "green.400" : undefined}
                bgColor={p.voteStatus === 1 ? "green.100" : undefined}
            >
                <GiPlasticDuck />
            </Button>
            <Badge fontSize="lg" my={2} colorScheme='blue' >{p.points}</Badge>
            <Button
                onClick={() => {
                    setLoadingStatus("downLoading");
                    vote({ value: -1, postId: p.id });
                    setLoadingStatus("notLoading");
                }}
                isLoading={loadingStatus === "downLoading"}
                color={p.voteStatus === -1 ? "red.400" : undefined}
                bgColor = {p.voteStatus === -1 ? "red.100" : undefined}
            >
                <GiRattlesnake />
            </Button>
        </Flex>
    );
};
