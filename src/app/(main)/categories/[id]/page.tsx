// "use client";

// import { useParams } from "next/navigation";
// server components params need to be async because SCs props are a promise.
export default async function page({ params }: { params: { id: string } }) {
  // to avoid any loading errors while waiting for a promise it is better to await the needed key in an object.
  const data = await params;
  const id = await data.id;
  console.log(id);
  return <div>{`${id}`}</div>;
}
