import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";

const allowedDriveIds = new Set(projects.map((p) => p.driveId));

export const Route = createFileRoute("/api/video/$driveId")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const driveId = params.driveId;
        const url = new URL(request.url);
        const uuid = url.searchParams.get("uuid");

        if (!driveId || !allowedDriveIds.has(driveId) || !uuid) {
          return new Response("Not found", { status: 404 });
        }

        const googleUrl = `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t&uuid=${uuid}`;

        const range = request.headers.get("range");
        const headers = new Headers();

        const maxChunkSize = 1024 * 1024; // 1 MB
        const totalSize = 167833519; // We should get the actual size from a HEAD request

        let upstreamRange: string | null = null;
        if (range) {
          const match = range.match(/^bytes=(\d+)-(\d+)?$/);
          if (match) {
            const start = parseInt(match[1], 10);
            const end = match[2] ? parseInt(match[2], 10) : null;
            const requestedEnd = end ?? Math.min(start + maxChunkSize - 1, totalSize - 1);
            const cappedEnd = Math.min(requestedEnd, start + maxChunkSize - 1);
            upstreamRange = `bytes=${start}-${cappedEnd}`;
          }
        }

        if (upstreamRange) {
          headers.set("Range", upstreamRange);
        }

        const upstream = await fetch(googleUrl, {
          redirect: "follow",
          headers,
        });

        if (!upstream.ok) {
          const text = await upstream.text().catch(() => "");
          return new Response(text, {
            status: upstream.status,
            statusText: upstream.statusText,
          });
        }

        const responseHeaders = new Headers();
        const copy = [
          "content-type",
          "content-length",
          "content-range",
          "accept-ranges",
          "etag",
          "last-modified",
        ];
        for (const key of copy) {
          const value = upstream.headers.get(key);
          if (value) responseHeaders.set(key, value);
        }
        responseHeaders.set("access-control-allow-origin", "*");

        return new Response(upstream.body, {
          status: upstream.status,
          statusText: upstream.statusText,
          headers: responseHeaders,
        });
      },
    },
  },
});
