import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsMe = () => {
    const [{data, fetching}] = useMeQuery()
    const router = useRouter()
    let isMe = false
    useEffect(() => {
        if(!fetching && !(router.query.id == data.me?.id)) {
            router.replace(`/duck/${router.query.id}/posts`)
        } else if (!fetching && router.query.id == data.me?.id) {
            isMe = true
        }
            
    },[fetching, router, data])
    return isMe
}