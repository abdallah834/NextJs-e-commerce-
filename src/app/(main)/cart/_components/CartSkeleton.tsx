import { Skeleton } from "@/components/ui/skeleton";

export function CartSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-3">
      <Skeleton className="h-[247px] rounded-xl bg-zinc-300 m-1 min-[365px]:w-xs min-[500px]:w-sm sm:w-lg md:w-xl lg:w-lg lg:justify-start" />
    </div>
  );
}
