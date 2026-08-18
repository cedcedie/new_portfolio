import type { Metadata } from "next";
import CertificatesIndex from "@/components/certificates/CertificatesIndex";
import { certificates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Credentials — Cydric James Bulan",
  description: `${certificates.length} certifications, 2023—2026.`,
};

export default function CertificatesPage() {
  return <CertificatesIndex />;
}
