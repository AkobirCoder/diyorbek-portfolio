import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * CaseTextBlock — case study matn bloki (CaseIntro / CaseApproach).
 * Frame.io uslubi: chapda mono yorliq, o'ngda matn.
 */
export function CaseTextBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <Container className="mt-20 lg:mt-28">
      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <Eyebrow className="h-fit">{label}</Eyebrow>
          <p className="text-body-lg text-fg max-w-[62ch] whitespace-pre-line text-pretty">
            {text}
          </p>
        </div>
      </Reveal>
    </Container>
  );
}
