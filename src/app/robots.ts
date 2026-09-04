import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Transactional pages add no search value and only get linked to from
      // within the ordering flow.
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
