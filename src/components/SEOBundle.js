import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import { Location } from "@reach/router"

import seo from "../data/seo.json"

const DEFAULT_IMAGE = "https://dev.leander.xyz/icons/logo-s.png"

const SEOBundle = ({
  description,
  image = DEFAULT_IMAGE,
  profile,
  title,
  theme,
}) => {
  const seoTitle = title != null ? title : seo[profile].title
  const seoDescription =
    description != null ? description : seo[profile].description
  return (
    <Location>
      {({ location: { href: url } }) => (
        <Helmet>
          {/* Generic */}
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />

          {/* Open Graph */}
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:site_name" content="leander.xyz" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={image} />
          <meta property="og:image:height" content={320} />
          <meta property="og:image:width" content={320} />

          {/* Iconography */}
          <meta name="theme-color" content={theme.shade.darkest} />
          <link rel="manifest" href={withPrefix("site.webmanifest")} />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix("favicon-32x32.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix("favicon-16x16.png")}
          />
          <meta name="msapplication-TileColor" content={theme.accent} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix("icons/apple-touch-icon.png")}
          />
          <link
            rel="mask-icon"
            href={withPrefix("icons/safari-pinned-tab.svg")}
            color={theme.accent}
          />
        </Helmet>
      )}
    </Location>
  )
}

export default SEOBundle
