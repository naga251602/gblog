import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Simple security check using a secret token passed in the webhook URL
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the home page and the specific post's route
    revalidatePath("/");

    if (body.record && body.record.slug) {
      revalidatePath(`/post/${body.record.slug}`);
    }

    // Force the server to rebuild the AVL tree on the next request
    // Note: In a true serverless environment, revalidatePath handles clearing the cache,
    // and the next request will naturally rebuild the tree in postService.ts if the instance is cold.

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
