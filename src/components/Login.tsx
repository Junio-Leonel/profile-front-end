import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function Login() {
  async function handleLogin(form: FormData) {
    "use server";

    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      return;
    }

    await fetch("http://localhost/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed");
        }

        return response.json();
      })
      .then((response) => {
        cookies().set("token", response.token);

        redirect("/profile");
      });
  }

  return (
    <form
      action={handleLogin}
      className="flex flex-col gap-4 w-full max-w-sm bg-white p-8 rounded-md"
    >
      <h1 className="text-xl font-semibold mb-4">Login to your account</h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="text"
          name="email"
          className="h-10 border border-gray-400 rounded-lg px-4 outline-none focus:border-gray-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="h-10 border border-gray-400 rounded-lg px-4 outline-none focus:border-gray-600"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 rounded-lg h-10 text-white font-semibold mt-4"
      >
        Sign In
      </button>
    </form>
  );
}
