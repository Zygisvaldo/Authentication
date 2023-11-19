import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData(); // no need for useRouteLoaderData because this is already the route of this loader
  const submit = useSubmit(); // to trigger Form submittion programmatically to trigger some action

  useEffect(() => {
    if (!token) {
      return;
    }

    // if token is expired, auto logout submitted
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    // if token start timer
    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" }); // manually subbmitting logout action that belogs to '/logout' route, with no data (null)
    }, tokenDuration); // 1 * 60 * 60 * 1000); // 1h is ms
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
