import { Stack } from "@chakra-ui/react"
import { CommentResponse } from "../generated/graphql"
import { CommentCard } from "./CommentCard"

interface CommentLayer {
    comments: Array<CommentResponse>
    depth: number
}
export const CommentStack: React.FC<CommentLayer> = ({comments: c, depth = 0}) => {
return (
        <Stack>
            {c.map(com => <CommentCard key={com.comment.id} comment={com} depth={depth+1}></CommentCard>)}
        </Stack>
)
}