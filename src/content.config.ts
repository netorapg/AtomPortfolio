import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    repoUrl: z.string().url().optional(),
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
  }),
});

export const collections = {
  'projects': projectsCollection,
  'experience': experienceCollection,
  'publications': publicationsCollection,
};