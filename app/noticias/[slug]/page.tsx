import { notFound } from "next/navigation";
import { Article } from "@/components/Article";
import { RelatedLinks } from "@/components/RelatedLinks";
import { meta } from "@/lib/meta";
import { NEWS, getNews } from "@/content/news";
import { GUIDE_META } from "@/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) return {};
  return meta(news.title, news.lead, `/noticias/${slug}`, "article");
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNews(slug);
  if (!news) notFound();

  const related = Object.values(GUIDE_META).slice(0, 3);

  return (
    <Article
      path={`/noticias/${news.slug}`}
      crumbs={[{ label: "Noticias", href: "/noticias" }, { label: news.title, href: `/noticias/${news.slug}` }]}
      kind="noticia"
      title={news.title}
      category={news.category}
      date={news.date}
      readMinutes={news.readMinutes}
      updated={news.date}
      lead={news.lead}
      sections={news.sections}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: news.title,
        description: news.lead,
        datePublished: news.date,
        dateModified: news.date,
        inLanguage: "es",
        mainEntityOfPage: `/noticias/${news.slug}`,
        publisher: { "@type": "Organization", name: "RADAR FF" },
      }}
      extraRelated={<RelatedLinks items={related} />}
    />
  );
}