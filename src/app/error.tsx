"use client";
// handling errors in the root directory
export default function error({ error }: { error: Error }) {
  return (
    <>
      <h3 className="text-3xl font-bold text-center">Something went wrong.</h3>
      <span className="block text-red-500 font-bold text-center">
        Error: {error.message}
      </span>
    </>
  );
}
