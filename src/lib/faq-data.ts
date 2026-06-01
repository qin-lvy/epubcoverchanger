export const faqItems = [
  {
    question: "How do I change the cover of an EPUB file?",
    answer:
      "Simply upload your EPUB file, then upload your new cover image (JPG, PNG, or WebP). You'll see a before/after preview, and then you can download your updated EPUB with one click. The entire process takes seconds and your files never leave your browser.",
  },
  {
    question: "Do you upload my files to a server?",
    answer:
      "No. Your files are processed entirely in your browser using JavaScript. They never leave your device. This means your ebooks and images stay completely private; we can't see them even if we wanted to.",
  },
  {
    question: "What is the recommended EPUB cover size?",
    answer:
      "There is no single EPUB cover size required by every platform. Standard EPUB, Apple Books, and Google Play Books work well with a 1600 x 2400px preset, Amazon KDP's ideal ebook cover is 1600 x 2560px, and Kobo favors a 3:4 ratio such as 1500 x 2000px. Our tool labels each preset so you know whether it is an official ideal, official ratio, or recommended preset.",
  },
  {
    question: "Can I change DRM-protected EPUB covers?",
    answer:
      "No. DRM (Digital Rights Management) is encryption that prevents editing. If your EPUB is DRM-protected (typically purchased from major retailers), it cannot be modified by any tool. EPUB files from self-publishing, AO3, Project Gutenberg, or other DRM-free sources work perfectly.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. Epub Cover Changer is currently free for single EPUB cover changes. You can process one EPUB at a time, up to 100MB, with no watermark and no required account. Future Pro features will focus on batch processing, saved presets, multi-platform exports, and higher workflow limits.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account is required for the current free tool. Login will only make sense when it gives you real value, such as saved presets, Pro early access, optional history, and faster repeat workflows.",
  },
  {
    question: "What will Pro include?",
    answer:
      "Pro will not sell basic quality, normal downloads, or watermark removal. Those are part of the free core experience. Pro is planned for publish-ready workflows: cover health checks, Kindle and Kobo display risk checks, platform compliance reports, batch EPUB cover replacement, multi-platform export bundles, and saved presets.",
  },
  {
    question: "Why would I join the Pro early access list?",
    answer:
      "Join if you publish or manage EPUB files often and want to be notified when Pro workflows open. We ask for an email only for Pro early access so we can invite you later, ask what workflow matters most, and offer early-user discounts.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
