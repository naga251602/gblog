// src/lib/postService.ts
import { supabase } from "./supabase";
import { AVLTree } from "./avlTree";

export async function buildSearchIndexes() {
  const searchIndex = new AVLTree<string, PostMetadata>();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .not("published_at", "is", null);

  if (error || !posts) return searchIndex;

  posts.forEach((post) => {
    // 1. Index by Tags
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        searchIndex.insert(tag.toLowerCase().trim(), post);
      });
    }

    // 2. Index by Category
    searchIndex.insert(post.category.toLowerCase().trim(), post);

    // 3. Index by Title Keywords (Splits title into words)
    const titleWords = post.title.toLowerCase().split(/\s+/);
    titleWords.forEach((word) => {
      // Remove punctuation and only index words longer than 2 chars
      const cleanWord = word.replace(/[^\w]/g, "");
      if (cleanWord.length > 2) {
        searchIndex.insert(cleanWord, post);
      }
    });
  });

  return searchIndex;
}
