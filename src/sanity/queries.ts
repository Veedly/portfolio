export const homeQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    name,
    role,
    intro,
    heroImageDark{
      ...,
      asset->
    },
    heroImageLight{
      ...,
      asset->
    },
    availabilityStatus,
    telegram,
    email,
    behance,
    footerNote
  },
  "featuredCases": *[_type == "case" && featured == true] | order(featuredOrder asc) {
    title,
    "slug": slug.current,
    subtitle,
    year,
    tags,
    coverImage{
      ...,
      asset->
    },
    showcasePreviewImage{
      ...,
      asset->
    }
  },
  "featuredShots": *[_type == "shot" && published == true && featured == true] | order(order asc) {
    title,
    image{
      ...,
      asset->
    },
    tags,
    year
  },
  "experience": *[_type == "experience"] | order(order asc) {
    company,
    role,
    period
  },
  "focus": *[_type == "focusItem"] | order(order asc) {
    title
  }
}`;

export const caseSlugsQuery = `*[_type == "case" && defined(slug.current)]{ "slug": slug.current }`;

export const caseBySlugQuery = `*[_type == "case" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  subtitle,
  coverImage{
    ...,
    asset->
  },
  showcasePreviewImage{
    ...,
    asset->
  },
  year,
  role,
  client,
  scope,
  tags,
  blocks
}`;

export const featuredCaseSuggestionsQuery = `*[_type == "case" && featured == true && slug.current != $slug] | order(featuredOrder asc)[0...4] {
  title,
  "slug": slug.current,
  subtitle,
  year,
  tags,
  coverImage{
    ...,
    asset->
  },
  showcasePreviewImage{
    ...,
    asset->
  }
}`;

export const shotsQuery = `*[_type == "shot" && published == true] | order(order asc) {
  title,
  image{
    ...,
    asset->
  },
  tags,
  year
}`;
