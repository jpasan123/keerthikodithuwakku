import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
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
          <div className="container-kk max-w-3xl pb-12 pt-28 md:pb-16 md:pt-32">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-kk-muted hover:text-kk-accent transition-colors mb-6"
            >
              <ArrowLeft className="size-4" /> Back to blog
            </Link>
            <time className="text-xs font-bold tracking-[0.12em] uppercase text-kk-accent">
              {new Date(post.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-3 font-display text-3xl md:text-5xl leading-[1.12] text-kk-ink">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-kk-muted leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="container-kk py-10">
          <div className="relative aspect-[16/9] max-w-4xl mx-auto overflow-hidden rounded-3xl border border-kk-border mb-10">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="prose-kk mx-auto max-w-2xl space-y-5 text-kk-muted leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-kk-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-base md:[&_p]:text-lg [&_strong]:text-kk-ink">
            <MDXRemote source={post.content} />
          </div>

          {related.length > 0 ? (
            <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-kk-border">
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
