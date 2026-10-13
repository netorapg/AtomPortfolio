import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    repoUrl: z.url().optional(),
    order: z.number(),
    en: z
      .object({
        description: z.string(),
      })
      .optional(),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
    en: z
      .object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        highlights: z.array(z.string()),
      })
      .optional(),
  }),
});

const publicationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    venue: z.string(),
    date: z.string(),
    type: z.string().default("Artigo Científico Publicado"),
    paperTitle: z.string(),
    authors: z.string(),
    abstract: z.string(),
    doi: z.string(),
    order: z.number(),
    en: z
      .object({
        date: z.string(),
        type: z.string(),
        paperTitle: z.string(),
        abstract: z.string(),
      })
      .optional(),
  }),
});

const stackCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stack" }),
  schema: z.object({
    category: z.string(),
    order: z.number(),
    items: z.array(z.string()),
    en: z
      .object({
        category: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'experience': experienceCollection,
  'publications': publicationsCollection,
  'stack': stackCollection,
};
