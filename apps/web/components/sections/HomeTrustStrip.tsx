import { Container } from "@/components/ui/Container"

const pillars = [
  {
    label: "Research-informed",
    title: "Conservation evidence",
    description:
      "Field learning, documentation, and ecological knowledge guide DESCF's conservation communication.",
  },
  {
    label: "Community-centred",
    title: "Public awareness",
    description:
      "DESCF promotes practical awareness to reduce fear, misinformation, and harmful responses to wildlife.",
  },
  {
    label: "Coexistence-focused",
    title: "People and nature",
    description:
      "The foundation supports safer relationships between communities, snakes, and broader biodiversity.",
  },
]

export function HomeTrustStrip() {
  return (
    <section
      aria-label="DESCF conservation priorities"
      className="border-b border-earth-200 bg-[#fbf8f0]"
    >
      <Container className="py-8 sm:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-earth-200/80 bg-white/75 p-5 shadow-sm transition duration-200 hover:border-forest-300 hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-700">
                {pillar.label}
              </p>

              <h2 className="mt-3 font-serif text-2xl leading-tight text-earth-950">
                {pillar.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-earth-700">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
