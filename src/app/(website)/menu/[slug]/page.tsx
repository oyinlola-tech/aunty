import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { menuItems } from "@/data/menu"
import { categories } from "@/data/categories"
import { siteConfig } from "@/config/site"
import { SectionContainer } from "@/components/shared/section-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { Sticker } from "@/components/shared/sticker"
import { Reveal } from "@/components/shared/reveal"
import { MenuGrid } from "@/features/menu/components/menu-grid"
import { ItemConfiguratorPanel } from "@/features/menu/components/item-configurator-panel"
import { formatCurrency } from "@/lib/currency"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface ItemPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = menuItems.find((menuItem) => menuItem.slug === slug)

  if (!item) {
    return { title: "Dish not found" }
  }

  const category = categories.find((cat) => cat.id === item.categoryId)

  return {
    title: item.name,
    description: `${item.description} Order from Soft Beans Palace in Port Harcourt via WhatsApp.`,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      title: `${item.name} | ${siteConfig.name}`,
      description: item.description,
    },
    twitter: {
      title: `${item.name} | ${siteConfig.name}`,
      description: item.description,
    },
    keywords: [
      item.name.toLowerCase(),
      category?.name.toLowerCase() ?? "",
      "soft beans",
      "Nigerian food",
      "Port Harcourt",
    ].filter(Boolean),
  }
}

export default async function MenuItemPage({ params }: ItemPageProps) {
  const { slug } = await params
  const item = menuItems.find((menuItem) => menuItem.slug === slug)

  if (!item) {
    notFound()
  }

  const category = categories.find((cat) => cat.id === item.categoryId)
  const relatedItems = menuItems
    .filter(
      (menuItem) =>
        menuItem.categoryId === item.categoryId && menuItem.id !== item.id
    )
    .slice(0, 3)

  const pageUrl = `${siteConfig.url}/menu/${item.slug}`
  const isMealBase =
    item.customization?.sides === true || item.customization?.proteins === true

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menu",
        item: `${siteConfig.url}/menu`,
      },
      { "@type": "ListItem", position: 3, name: item.name, item: pageUrl },
    ],
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: `${siteConfig.url}${item.image}`,
    url: pageUrl,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(item.price > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NGN",
            price: item.price,
            availability: item.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: pageUrl,
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <SectionContainer className="flex flex-col gap-10 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-warm-grey">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-palace-orange">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/menu" className="transition-colors hover:text-palace-orange">
                Menu
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-bean-black">
              {item.name}
            </li>
          </ol>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Food imagery */}
          <Reveal className="relative flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-deep shadow-sm">
              <Image
                src={item.image}
                alt={`${item.name} from the Soft Beans Palace menu`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/75">
                  <span className="rounded-full bg-warm-grey px-4 py-2 text-sm font-semibold text-white">
                    Sold out today
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-border/50 bg-cream p-5">
              <p className="font-heading text-sm font-bold tracking-wide text-palace-orange uppercase">
                Ordering is easy
              </p>
              <ul className="flex flex-col gap-1 text-sm text-warm-grey">
                <li>Build your meal exactly how you like it.</li>
                <li>Review everything in your cart.</li>
                <li>Send the order to us on WhatsApp.</li>
              </ul>
            </div>
          </Reveal>

          {/* Details + configuration */}
          <Reveal delay={0.06} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {category && <Sticker variant="orange">{category.name}</Sticker>}
              <h1 className="font-heading text-3xl font-bold text-balance text-bean-black sm:text-4xl">
                {item.name}
              </h1>

              <p className="max-w-prose leading-relaxed text-warm-grey">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {item.price > 0 ? (
                  <span className="font-heading text-2xl font-bold text-bean-black">
                    {formatCurrency(item.price)}
                  </span>
                ) : (
                  <span className="font-heading text-xl font-bold text-warm-brown">
                    Price on request
                  </span>
                )}
                {item.available ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-green">
                    <span className="size-2 rounded-full bg-muted-green" />
                    Available today
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-rich-red">
                    <span className="size-2 rounded-full bg-rich-red" />
                    Unavailable today
                  </span>
                )}
              </div>

              {isMealBase && (
                <p className="rounded-xl bg-cream-deep p-3 text-sm text-warm-grey">
                  Build your plate — add any number of sides and proteins,
                  each with its own quantity. Everything optional.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border/50 bg-cream-deep/60 p-5 sm:p-6">
              <ItemConfiguratorPanel item={item} />
            </div>
          </Reveal>
        </div>

        <div className="flex justify-center">
          <Link
            href="/menu"
            className={cn(
              buttonVariants({ variant: "soft", size: "lg" }),
              "no-underline"
            )}
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to the full menu
          </Link>
        </div>
      </SectionContainer>

      {relatedItems.length > 0 && (
        <SectionContainer className="flex flex-col gap-10 border-t border-border/50 py-16">
          <SectionHeading
            eyebrow="More to try"
            title={`More ${category?.name.toLowerCase() ?? "favourites"}`}
            description="Still hungry? These go just as well with soft beans."
          />
          <Reveal>
            <MenuGrid items={relatedItems} />
          </Reveal>
          <Reveal className="flex justify-center">
            <Link
              href="/menu"
              className={cn(buttonVariants({ size: "lg" }), "no-underline")}
            >
              Explore the Full Menu
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </SectionContainer>
      )}
    </>
  )
}
