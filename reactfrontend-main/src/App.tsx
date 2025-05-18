import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import IngredientsPage from "@presentation/pages/IngredientsPage";
import MyRecipesPage from "@presentation/pages/MyRecipesPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import RegisterPage from "@presentation/pages/RegisterPage";
import { useAppSelector } from "@application/store";

export function App() {
  const isAdmin = !!useOwnUserHasRole(UserRoleEnum.Admin);
  const { loggedIn } = useAppSelector(x => x.profileReducer);

  return (
    <AppIntlProvider>
      <ToastNotifier />
      {/* NavBar eliminat, este deja inclus în WebsiteLayout! */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Ingredients} element={<IngredientsPage />} />
        {loggedIn && <Route path={AppRoute.MyRecipes} element={<MyRecipesPage />} />}
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />}
        {/* {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />} */}
      </Routes>
    </AppIntlProvider>
  );
}
