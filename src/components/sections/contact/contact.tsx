import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { BriefForm } from "./brief-form";
import { ContactChannels } from "./contact-channels";

/**
 * Contact — "Qanday yozaman?" (Blueprint §1, §4, §9).
 * Sarlavha + brif shakli (chap) + to'g'ridan-to'g'ri aloqa kanallari (o'ng).
 *
 * BriefForm o'zining `position: fixed` toastini render qiladi — shu bois shakl
 * transformlangan o'ramга (Reveal) O'RALMAYDI. Faqat sarlavha animatsiyalanadi.
 */
export interface ContactProps {
  id: string;
  labelledBy: string;
  eyebrow: string;
  title: string;
  description: string;
  channelsTitle: string;
}

export function Contact({
  id,
  labelledBy,
  eyebrow,
  title,
  description,
  channelsTitle,
}: ContactProps) {
  return (
    <Section id={id} labelledBy={labelledBy}>
      <Reveal>
        <SectionHeading
          titleId={labelledBy}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <BriefForm />
        <div className="lg:pt-1">
          <ContactChannels title={channelsTitle} />
        </div>
      </div>
    </Section>
  );
}
