import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[225px] rounded-xl bg-zinc-300" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[220px] bg-zinc-300" />
        <Skeleton className="h-6 w-[200px] bg-zinc-300" />
        <Skeleton className="h-6 w-[200px] bg-zinc-300" />
      </div>
    </div>
  );
}
