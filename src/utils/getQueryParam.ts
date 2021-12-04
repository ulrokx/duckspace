import { useRouter } from "next/router";

const getQueryParam = ({param, isid}: {param: string, isid: boolean}) => {
    const router = useRouter();
    let queryP: string | number;
    queryP =
        typeof router.query[param] === "string" && isid
            ? parseInt(router.query[param] as string, 10)
            : queryP;
    return queryP;
};
export default getQueryParam;
