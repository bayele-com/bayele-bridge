import { useSearchParams } from "react-router-dom";
import { SearchResults } from "@/components/search/SearchResults";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for "{query}"
      </h1>
      <SearchResults query={query} />
    </div>
  );
}