import { ChevronDown, ChevronRight, Download, Image, Upload } from "lucide-react";
import { Fragment } from "react";

const steps = [
  {
    number: 1,
    icon: Upload,
    iconColor: "#2563EB",
    bgColor: "bg-primary-light",
    title: "Upload your EPUB",
    description:
      "Drag and drop your ebook file. We'll extract the current cover automatically.",
  },
  {
    number: 2,
    icon: Image,
    iconColor: "#7C3AED",
    bgColor: "bg-violet-100",
    title: "Choose new cover",
    description:
      "Upload any JPG, PNG or WebP image. Preview before & after instantly.",
  },
  {
    number: 3,
    icon: Download,
    iconColor: "#16A34A",
    bgColor: "bg-green-100",
    title: "Preview & download",
    description:
      "Compare before and after with the slider, then save your updated EPUB.",
  },
];

function StepConnector({ direction }: { direction: "horizontal" | "vertical" }) {
  if (direction === "horizontal") {
    return (
      <div
        className="hidden shrink-0 items-center self-start pt-[4.25rem] md:flex md:w-16 lg:w-20"
        aria-hidden="true"
      >
        <div className="flex w-full items-center">
          <div className="h-0 flex-1 border-t-2 border-dashed border-gray-300" />
          <ChevronRight className="h-5 w-5 shrink-0 text-gray-300" strokeWidth={2} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center py-3 md:hidden"
      aria-hidden="true"
    >
      <div className="h-6 w-0 border-l-2 border-dashed border-gray-300" />
      <ChevronDown className="h-5 w-5 text-gray-300" strokeWidth={2} />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-12 text-center text-[36px] font-extrabold text-[#111827]">
          How it works
        </h2>
        <div className="mx-auto flex max-w-[960px] flex-col items-stretch md:flex-row md:items-start md:justify-center">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="flex-1 text-center">
                <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.number}
                </div>
                <div
                  className={`mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full ${step.bgColor}`}
                >
                  <step.icon
                    className="h-6 w-6"
                    style={{ color: step.iconColor }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#4B5563]">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <>
                  <StepConnector direction="horizontal" />
                  <StepConnector direction="vertical" />
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
