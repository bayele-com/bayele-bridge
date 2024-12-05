export function PropertyListingsEmpty() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold">No properties found</h3>
      <p className="text-muted-foreground mt-2">
        Try adjusting your filters to see more results
      </p>
    </div>
  );
}