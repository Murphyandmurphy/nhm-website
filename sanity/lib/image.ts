import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** urlFor(image).width(1200).url() — build a CDN URL for a Sanity image. */
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);
