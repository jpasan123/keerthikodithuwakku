import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, fellowships, and updates from Keerthi Kodithuwakku.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Stories from the MedTech journey"
        description="Fellowships, product milestones, and leadership updates — curated without duplicate or third-party filler imagery."
        image="/media/hero/portrait-hq.jpg"
        position="object-[55%_28%]"
      />

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-kk-border bg-white hover:border-kk-accent/40 hover:shadow-lg hover:shadow-kk-ink/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs font-semibold uppercase tracking-wide text-kk-accent">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-semibold text-kk-ink leading-snug group-hover:text-kk-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-kk-muted leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-kk-ink">
                    Read post{" "}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ConnectCTA />
    </>
  );
}
