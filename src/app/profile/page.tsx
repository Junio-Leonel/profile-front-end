import Image from "next/image";
import { cookies } from "next/headers";

import { Button } from "@/components/Button";

export default async function Profile() {
  const response = await fetch("http://localhost/api/v1/profiles", {
    method: "GET",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  const data = await response.json().then((response) => response.data);

  if (!cookies().has("token")) {
    return <span className="text-white">Perfil não encontrado</span>;
  }

  return (
    <section className="w-screen h-screen bg-gray-900 flex justify-center">
      <Button className="text-white absolute right-6 top-6 font-semibold">
        Logout
      </Button>

      <div className="flex items-center gap-20">
        <div className="w-48 h-48 rounded-full border border-gray-700 flex items-center justify-center">
          <Image
            src={data[0].photo}
            priority
            width={500}
            height={500}
            alt="photo"
            className="rounded-full h-44 w-44 object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-white text-2xl">{data[0].user}</span>

          <div className="flex items-center gap-8">
            <span className="text-white">{`${data[0].publication} publicações`}</span>
            <span className="text-white">{`${data[0].followers} seguidores`}</span>
            <span className="text-white">{`${data[0].following} seguindo`}</span>
          </div>

          <p className="text-white max-w-md">{data[0].description}</p>
        </div>
      </div>
    </section>
  );
}
