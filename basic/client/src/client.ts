import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const result = await client.sayHi.query();
  console.log(result);
  const res = await client.logToServer.mutate("Hi from the client");
  console.log(res);
  const user = await client.users.get.query({ userId: "123" });
  console.log(user);
  const updatedUser = await client.users.update.mutate({ userId: "123", name: "Rafa" });
  console.log(updatedUser);
  const secretData = await client.secretData.query();
  console.log(secretData);
}

main();
