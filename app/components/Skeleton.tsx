import SkeletonCard from "./SkeletonCard";

export async function Skeleton(params: any) {
    
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-2 gap-8 mt-8">
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
        <SkeletonCard></SkeletonCard>
      </div>
    );
  }
  