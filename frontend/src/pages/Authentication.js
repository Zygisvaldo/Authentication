import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const data = await request.formData();
  // to get hold of searchParams not in jsx we can use 'new URL(req.url).searchParams'
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  //console.log(mode);

  if (mode !== "login" && mode !== "signup") {
    throw json(
      {
        message: "Auth mode not supported!",
      },
      {
        status: 422, // invalid user input
      }
    );
  }

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: request.method,
    body: JSON.stringify(authData),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.status === 422 || response.status === 401) {
    return response; // because i want to upd UI if there is errors, not redirect
  }

  if (!response.ok) {
    throw json(
      {
        message: "Could not authenticate user!",
      },
      {
        status: 500,
      }
    );
  }
  // managing jwt token here

  return redirect("/");
}
