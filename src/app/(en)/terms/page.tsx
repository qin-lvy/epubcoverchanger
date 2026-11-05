import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, siteUrl } from "@/lib/localized-routes";

export const metadata: Metadata = {
  title: "Terms of Service | EpubCoverChanger.com",
  description:
    "Terms for using the free EPUB cover changer and EPUB metadata editor on EpubCoverChanger.com.",
  alternates: { canonical: `${siteUrl}/terms` },
};

const sections = [
  {
    title: "Use of the tools",
    body: "EpubCoverChanger.com offers free tools to change EPUB covers and edit EPUB metadata. By using the site, you agree to these terms. Use the tools only with files you own, have permission to edit, or are legally allowed to modify.",
  },
  {
    title: "DRM-protected books",
    body: "The tools do not remove DRM or any other copy protection, and they refuse files they detect as DRM-protected. Do not use the site to get around the rights of authors or publishers.",
  },
  {
    title: "Your files and output",
    body: "Your files are processed in your browser and are not uploaded to us. We do not claim any ownership of the files you use or the EPUBs you save. You are responsible for the rights, quality, and distribution of the output.",
  },
  {
    title: "Keep a copy of the original",
    body: "Saving creates a new EPUB and does not change your original file. Keep the original until you have checked the new version in your reading app.",
  },
  {
    title: "No guarantee of platform approval",
    body: "We provide size presets based on each platform's published guidance, but stores and reading apps can change their requirements. Check the final EPUB on the platform where you plan to read or publish it.",
  },
  {
    title: "Provided as is",
    body: "The tools are free and provided \"as is\", without warranties of any kind. To the extent the law allows, we are not liable for lost data, lost profits, or any indirect damages arising from your use of the site.",
  },
  {
    title: "Changes",
    body: "We may update these terms as the site changes, for example if accounts, paid features, or batch processing are added. The date at the top shows the latest version.",
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Terms
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: November 5, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-gray-700">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-gray-950">{section.title}</h2>
            <p className="mt-3">{section.body}</p>
          </div>
        ))}

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Contact</h2>
          <p className="mt-3">
            Questions about these terms:{" "}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
              {contactEmail}
            </a>
            . See also our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
