import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { projects } from "./projects";

const allowedDriveIds = new Set(projects.map((p) => p.driveId));

const driveVideoSchema = z.object({ driveId: z.string() });

export const getDriveVideoUrl = createServerFn({ method: "GET" })
  .validator(driveVideoSchema)
  .handler(async ({ data }) => {
    const { driveId } = data;

    if (!allowedDriveIds.has(driveId)) {
      throw new Error("Invalid drive ID");
    }

    const downloadPageUrl = `https://drive.google.com/uc?export=download&id=${driveId}`;

    const response = await fetch(downloadPageUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("video/")) {
      return { url: response.url };
    }

    const html = await response.text();
    const uuidMatch = html.match(/name="uuid" value="([^"]+)"/);
    if (!uuidMatch) {
      throw new Error("Could not extract video download token");
    }

    const uuid = uuidMatch[1];
    const videoUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t&uuid=${uuid}`;

    return { url: videoUrl };
  });

