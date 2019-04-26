import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import { Location } from "@reach/router"

import seo from "../data/seo.json"

const DEFAULT_IMAGE = "https://dev.leander.xyz/icons/logo-d.png"

const SEOBundle = ({ image = DEFAULT_IMAGE, seoProfile, theme }) => {
  if (!seo[seoProfile])
    throw new Error(`SEO Profile "${seoProfile}" not found.`)
  const { title, description } = seo[seoProfile]
  return (
    <Location>
      {({ location: { href: url } }) => (
        <Helmet>
          {/* Generic */}
          <title>{title}</title>
          <meta name="description" content={description} />

          {/* Open Graph */}
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="leander.xyz" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={image} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@leeandher" />
          <meta name="twitter:creator" content="@leeandher" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content="leander.xyz logo" />

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
