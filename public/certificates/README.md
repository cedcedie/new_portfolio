# Certificates

Drop your certificate files here. They are served at `/certificates/<filename>`.

Expected filenames (referenced in `lib/resume-data.ts`):

- `systems-administration.pdf` / `systems-administration.png`
- `java-fundamentals.pdf` / `java-fundamentals.png`
- `java-fundamentals-2.pdf`
- TOPCIT certificates render as static cards until you add files and wire up
  the `file:`/`image:` paths in resume-data.ts.

You can use PDF or image (PNG/JPG). After adding a file, make sure the matching
`file:` path in `certifications` (lib/resume-data.ts) points to it. A cert with
no `file` simply renders as a non-clickable card.
