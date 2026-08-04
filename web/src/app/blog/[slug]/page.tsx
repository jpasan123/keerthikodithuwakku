import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { ContentImageFrame } from "@/components/ContentImage";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-kk-border bg-kk-surface">
          <div className="container-kk pb-12 pt-32 md:pb-16 md:pt-36">
            <div className="flex flex-col gap-5 md:gap-6">
              <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-kk-muted hover:text-kk-accent transition-colors"
              >
                <ArrowLeft className="size-4 shrink-0" />
                Back to blog
              </Link>
              <div className="space-y-3 md:space-y-4">
                <time className="block text-xs font-bold tracking-[0.12em] uppercase text-kk-accent">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h1 className="font-display text-3xl md:text-[2.75rem] lg:text-5xl leading-[1.12] text-kk-ink max-w-4xl">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-kk-muted leading-relaxed max-w-3xl">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container-kk py-10 md:py-14">
          <figure className="mx-auto mb-10 md:mb-12 w-full max-w-xl sm:max-w-2xl md:max-w-[720px]">
            <ContentImageFrame
              src={post.image}
              alt=""
              fit="contain"
              aspect="aspect-[16/10]"
              priority
              sizes="(max-width: 768px) 90vw, 720px"
              className="rounded-2xl border border-kk-border shadow-[0_12px_40px_rgba(12,14,10,0.06)]"
            />
          </figure>

          <div className="prose-kk space-y-5 text-kk-muted leading-relaxed [&_h2]:font-display [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-kk-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-base md:[&_p]:text-lg [&_strong]:text-kk-ink">
            <MDXRemote source={post.content} />
          </div>

          {related.length > 0 ? (
            <div className="mt-16 pt-10 border-t border-kk-border">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-kk-accent mb-4">
                Related
              </p>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="font-semibold text-kk-ink hover:text-kk-accent transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      <ConnectCTA />
    </>
  );
}
