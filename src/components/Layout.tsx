import React, { ReactChildren } from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVariants } from "./Wrapper";

interface LayoutProps {
    wrapperVariant?: WrapperVariants;
    showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, wrapperVariant, showNav }) => {
    return (
        <>
            {showNav ? <NavBar /> : null}
            <Wrapper variant={wrapperVariant}>{children}</Wrapper>
        </>
    );
};
