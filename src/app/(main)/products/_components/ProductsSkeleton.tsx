import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function ProductsSkeleton() {
  const count = 12;
  return (
    <>
      <div className="flex justify-center mt-12 ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-6xl gap-5">
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
