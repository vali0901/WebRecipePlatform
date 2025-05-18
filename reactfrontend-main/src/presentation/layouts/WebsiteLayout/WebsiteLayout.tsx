import NavBar from "@presentation/components/ui/NavBar";
import { Footer } from "../Footer";
import { MainContent } from "../MainContent";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import React, { memo, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@application/store";
import { resetProfile } from "@application/state-slices";

/**
 * This component should be used for all pages in the application, it wraps other components in a layout with a navigation bar and a footer.
 */
export const WebsiteLayout = memo(
  (props: PropsWithChildren<{}>) => {
    const { children } = props;
    const isAdmin = !!useOwnUserHasRole(UserRoleEnum.Admin);
    const { loggedIn } = useAppSelector(x => x.profileReducer);
    const dispatch = useAppDispatch();
    const handleLogout = () => dispatch(resetProfile());
    const location = useLocation();

    return <div className="flex flex-col min-h-screen">
      <NavBar isAdmin={isAdmin} isLoggedIn={loggedIn} onLogout={handleLogout} />
      <MainContent>{children}</MainContent>
      <Footer />
    </div>
  }
);
