export function PropertyListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="h-[400px] bg-muted animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}