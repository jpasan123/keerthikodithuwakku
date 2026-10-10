import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConnectCTA } from "@/components/ConnectCTA";
import { FullGallery } from "@/components/FullGallery";
import { PageHero } from "@/components/PageHero";
import { gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Keerthi Kodithuwakku's leadership, partnerships and collaboration across MedTech, research and innovation events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Leadership and collaboration in focus"
        description="Moments from partnerships, conferences and visits across the MedTech and innovation ecosystem."
        image="/media/hero/ict-leader-stage-hq.jpg"
        position="object-[50%_40%]"
        mobileImage="/media/awards/ict-leader-trophy.jpg"
      />

      <section className="container-kk py-14 md:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-kk-muted transition-colors hover:text-kk-accent"
        >
          <ArrowLeft className="size-4 shrink-0" />
          Back to home
        </Link>
        <FullGallery items={gallery} />
      </section>

      <ConnectCTA />
    </>
  );
}
