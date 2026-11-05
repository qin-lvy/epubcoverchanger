import type { Metadata } from "next";
import Link from "next/link";
import { contactEmail, siteUrl } from "@/lib/localized-routes";

export const metadata: Metadata = {
  title: "Privacy Policy | EpubCoverChanger.com",
  description:
    "How EpubCoverChanger.com handles your data: EPUB files and images stay in your browser, analytics are anonymous, and we never sell personal data.",
  alternates: { canonical: `${siteUrl}/privacy` },
};

const sections = [
  {
    title: "The short version",
    paragraphs: [
      "Your EPUB files and cover images are processed in your browser and are not uploaded to our servers. We use anonymous analytics to see which pages and tool steps work. We only receive personal information, such as an email address, if you choose to send it to us. We do not sell personal data, and the site has no ads or advertising trackers.",
    ],
  },
  {
    title: "Your books and images",
    paragraphs: [
      "The cover changer and the metadata editor read and rebuild your EPUB entirely in your browser. The book, its text, and the cover image you choose are not sent to us or to any third party. When you close the page, they are gone from the tool.",
      "Usage statistics never include file names, book titles, authors, or any other content from your files. For the metadata editor, we record which kinds of fields were changed (for example \"title\" or \"language\"), never the values you typed.",
    ],
  },
  {
    title: "Anonymous usage statistics",
    paragraphs: [
      "On epubcoverchanger.com we use PostHog, an analytics service based in the United States, to count page views and tool steps such as \"EPUB opened\", \"cover prepared\", \"EPUB saved\", or \"failed: file too large\". Each event includes the page path, a device category (desktop, mobile, or tablet), and a random ID.",
      "That random ID is created in your browser and saved in its local storage so repeat visits can be counted. It is not linked to your name or email. We do not set advertising cookies. As with any web request, PostHog receives your IP address and browser details when an event is sent. You can clear the ID at any time by clearing this site's data in your browser.",
    ],
  },
  {
    title: "Feedback and Pro early access",
    paragraphs: [
      "If you use the feedback form, we store the feedback type, your message, the page address, your browser's user-agent string, and your email address only if you enter one. If you join Pro early access, we store your email address and any note you add. This information is stored with our database provider, Supabase, and is used only to reply to you, fix problems, and decide what to build next.",
    ],
  },
  {
    title: "Email",
    paragraphs: [
      `Messages sent to ${contactEmail} are forwarded through Cloudflare to a Gmail inbox that we read. We keep emails only as long as we need them to help you, and we don't add you to any mailing list.`,
    ],
  },
  {
    title: "Hosting and service providers",
    paragraphs: [
      "The site is hosted on Vercel. Like any web host, Vercel processes standard request data, such as IP address, browser, and the page requested, to deliver pages and keep the service secure. Cloudflare provides our domain's DNS and email forwarding. We use these providers only to run the site.",
    ],
  },
  {
    title: "Children",
    paragraphs: [
      "The site is not directed at children under 13, and we do not knowingly collect personal information from them.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      `You can use every tool without giving us any personal information. To see, correct, or delete feedback or an email address you sent us, write to ${contactEmail} and we will handle it.`,
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "If we add accounts, payments, or advertising, we will update this policy before those features go live. The date at the top shows the latest version.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
        Privacy Policy
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: November 5, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-gray-700">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-gray-950">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3">{paragraph}</p>
            ))}
          </div>
        ))}

        <div>
          <h2 className="text-xl font-semibold text-gray-950">Contact</h2>
          <p className="mt-3">
            Privacy questions:{" "}
            <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
              {contactEmail}
            </a>
            . See also our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
