import Image from "next/image";
import { cookies } from "next/headers";
import { LogoutButton } from "./_components/LogoutButton";

export default async function Profile() {
  const response = await fetch("http://localhost/api/v1/profile", {
    method: "GET",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  const data = await response.json().then((response) => response.data);

  return (
    <section className="w-screen h-screen bg-gray-900 flex justify-center">
      <LogoutButton />

      <div className="flex items-center gap-20">
        <div className="w-48 h-48 rounded-full border border-gray-700 flex items-center justify-center">
          <Image
            src={data.photo}
            priority
            width={500}
            height={500}
            alt="photo"
            className="rounded-full h-44 w-44 object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-white text-2xl">{data.name}</span>

          <div className="flex items-center gap-8">
            <span className="text-white">{`${data.publication} publicações`}</span>
            <span className="text-white">{`${data.followers} seguidores`}</span>
            <span className="text-white">{`${data.following} seguindo`}</span>
          </div>

          <p className="text-white max-w-md">{data.description}</p>
        </div>
      </div>
    </section>
  );
}
