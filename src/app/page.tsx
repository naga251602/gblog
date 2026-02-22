// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    setHasSearched(false);
    setSearchQuery("");
    const { data } = await supabase
      .from("posts")
      .select("*")
      .not("published_at", "is", null)
      .order("published_at", { ascending: false });
    if (data) setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Inside handleSearch in src/app/page.tsx
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // encodeURIComponent handles special characters like # or spaces in tags
      const res = await fetch(
        `/api/search?tag=${encodeURIComponent(trimmedQuery)}`,
      );
      const data = await res.json();

      // Explicitly set results
      setPosts(data.results || []);
    } catch (err) {
      console.error(err);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6">
      <header className="py-12">
        <h1 className="text-4xl font-bold text-brand mb-10">Writings.</h1>

        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <button
            type="submit"
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Search"
            )}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={fetchAllPosts}
            className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
            title="Refresh feed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading && !searchQuery ? "animate-spin" : ""}`}
            />
          </button>
        </form>
      </header>

      <main className="border-t border-gray-200 pt-8">
        {posts.length === 0 && hasSearched ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No results for "{searchQuery}"</p>
            <button
              onClick={fetchAllPosts}
              className="text-brand font-bold underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className="block group"
              >
                <article className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                  <time className="text-sm text-gray-400 sm:w-24 shrink-0">
                    {new Date(post.published_at).toLocaleDateString()}
                  </time>
                  <div>
                    <h2 className="text-xl font-bold text-brand mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-3">{post.excerpt}</p>
                    <span className="text-sm font-bold flex items-center gap-1">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
