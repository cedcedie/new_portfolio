# Certificates

Drop your certificate files here. They are served at `/certificates/<filename>`.

Expected filenames (referenced in `lib/data.ts`):

- `systems-administration.pdf` / `systems-administration.png`
- `java-fundamentals.pdf` / `java-fundamentals.png`
- `java-fundamentals-2.pdf`
- TOPCIT certificates render as static cards until you add files and wire up
  the `fileUrl`/`imageUrl` paths in data.ts.

You can use PDF or image (PNG/JPG). After adding a file, make sure the matching
`fileUrl` path in the `certificates` array (lib/data.ts) points to it. A cert with
no `fileUrl` simply renders as a non-clickable card.
