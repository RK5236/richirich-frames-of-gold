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
        if (range) {
          headers.set("Range", range);
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
