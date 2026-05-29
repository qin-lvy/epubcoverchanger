import Link from "next/link";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function StunningQuality() {
  return (
    <section className="bg-white px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="text-center text-[28px] font-extrabold text-[#111827] italic lg:text-[40px]">
          Stunning quality
        </h2>
        <p className="mt-3 mb-10 text-center text-lg text-gray-500">
          See how a simple cover change transforms your ebook
        </p>

        <BeforeAfterSlider
          beforeImage="/examples/example1-before.svg"
          afterImage="/examples/example1-after.svg"
          initialPosition={50}
          showcase
        />

        <p className="mt-8 text-center">
          <Link
            href="#how-it-works"
            className="text-[15px] font-medium text-primary hover:underline"
          >
            See how it works -&gt;
          </Link>
        </p>
      </div>
    </section>
  );
}
