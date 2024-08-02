import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  MediaId, 
  NewMediaParams,
  UpdateMediaParams, 
  updateMediaSchema,
  insertMediaSchema, 
  media,
  mediaIdSchema 
} from "@/lib/db/schema/media";

export const createMedia = async (media: NewMediaParams) => {
  const newMedia = insertMediaSchema.parse(media);
  try {
    const [m] =  await db.insert(media).values(newMedia).returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMedia = async (id: MediaId, media: UpdateMediaParams) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  const newMedia = updateMediaSchema.parse(media);
  try {
    const [m] =  await db
     .update(media)
     .set({...newMedia, updatedAt: new Date() })
     .where(eq(media.id, mediaId!))
     .returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMedia = async (id: MediaId) => {
  const { id: mediaId } = mediaIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(media).where(eq(media.id, mediaId!))
    .returning();
    return { media: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

