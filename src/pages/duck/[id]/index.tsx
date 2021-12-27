import { useTransform } from 'framer-motion';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { createURQLClient } from '../../../utils/createURQLClient';


const Index: React.FC = ({}) => {
    const router = useRouter()
    const id = router.query.id
    useEffect(() => {
    router.replace(`/duck/${id}/posts`)
    }, [router, id])
        return (
           <p>redirecting...</p> 
        );
}

export default withUrqlClient(createURQLClient)(Index)