import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  tags?: string[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: String(data.title || slug),
    excerpt: String(data.excerpt || ""),
    date: String(data.date || ""),
    image: String(data.image || "/media/portraits/keerthi-ceo.jpeg"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content, ...meta } = post;
      void content;
      return meta;
    })
    .filter((p): p is BlogPostMeta => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
