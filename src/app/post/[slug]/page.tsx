// src/app/post/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, MessageSquare, Share } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .not("published_at", "is", null);

  return posts?.map((post) => ({ slug: post.slug })) || [];
}

// 1. Update the type to reflect that params is a Promise
export default async function PostView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Await the params before using them
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="animate-fade-in max-w-3xl w-full mx-auto px-6 py-8">
      <Link
        href="/"
        className="mb-10 text-sm font-medium text-gray-500 hover:text-brand transition-colors inline-flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to writings
      </Link>

      <article>
        <header className="mb-12">
          <time
            dateTime={post.published_at}
            className="text-sm font-medium text-gray-400"
          >
            {formattedDate}
          </time>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand mt-3 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <Image
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e5e7eb"
              alt="Author avatar"
              width={40}
              height={40}
              className="rounded-full border border-gray-200"
              unoptimized={false}
            />
            <div>
              <p className="text-sm font-semibold text-brand">Gaurav N V</p>
              <p className="text-xs text-gray-500">Software Engineer</p>
            </div>
          </div>
        </header>

        <div
          className="prose prose-gray prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-brand transition-colors inline-flex items-center gap-1 text-sm font-medium">
              <Heart className="w-4 h-4" /> 124 Likes
            </button>
            <button className="text-gray-500 hover:text-brand transition-colors inline-flex items-center gap-1 text-sm font-medium">
              <MessageSquare className="w-4 h-4" /> 12 Comments
            </button>
          </div>
          <button className="text-gray-500 hover:text-brand transition-colors inline-flex items-center gap-2 text-sm font-medium">
            Share <Share className="w-4 h-4" />
          </button>
        </div>
      </article>
    </div>
  );
}
