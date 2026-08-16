import type { Metadata } from "next";
import CertificatesIndex from "@/components/certificates/CertificatesIndex";

export const metadata: Metadata = {
  title: "Credentials — Cydric James Bulan",
  description: "06 certifications, 2023—2026.",
};

export default function CertificatesPage() {
  return <CertificatesIndex />;
}
