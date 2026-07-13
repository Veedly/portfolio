export const homeQuery = `{
  "settings": *[_type == "siteSettings"][0]{
    name,
    role,
    intro,
    heroMeta,
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
    cvFile{
      ...,
      asset->
    },
    footerNote
  },
  "featuredCases": *[_type == "case" && featured == true] | order(featuredOrder asc) {
    title,
    "slug": slug.current,
    subtitle,
    status,
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
    mediaType,
    image{
      ...,
      asset->
    },
    videoFile{
      ...,
      asset->
    },
    "tags": {
      "ru": tags[]->title.ru,
      "en": tags[]->title.en
    },
    year
  },
  "experience": *[_type == "experience"] | order(order asc) {
    company,
    role,
    period,
    summary
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
  status,
  statusDetails,
  role,
  client,
  scope,
  tags,
  blocks[]{
    ...,
    items[]{
      ...,
      images[]{
        ...,
        asset->
      },
      videoFile{
        ...,
        asset->
      }
    },
    videoFile{
      ...,
      asset->
    },
    posterImage{
      ...,
      asset->
    }
  }
}`;

export const featuredCaseSuggestionsQuery = `*[_type == "case" && featured == true && slug.current != $slug] | order(featuredOrder asc)[0...4] {
  title,
  "slug": slug.current,
  subtitle,
  status,
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

export const cvPageQuery = `*[_type == "cvPage"][0]{
  eyebrow,
  name,
  role,
  intro,
  contact,
  sectionLabels,
  experience[] | order(order asc) {
    period,
    title,
    place,
    text
  },
  education[] | order(order asc) {
    period,
    title,
    place,
    text
  },
  sideProjects[] | order(order asc) {
    period,
    title,
    place,
    text
  },
  skills,
  cvFile{
    ...,
    asset->
  }
}`;

export const shotsQuery = `*[_type == "shot" && published == true] | order(order asc) {
  title,
  mediaType,
  image{
    ...,
    asset->
  },
  videoFile{
    ...,
    asset->
  },
  "tags": {
    "ru": tags[]->title.ru,
    "en": tags[]->title.en
  },
  year
}`;
