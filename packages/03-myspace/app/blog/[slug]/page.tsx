import { posts } from '@/lib/data';

export const revalidate = 1200;

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = posts.find((post) => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}