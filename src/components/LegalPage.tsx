import { Container, Breadcrumbs } from './ui'
import { PlusIcon } from './Icons'

export interface LegalSection {
  id: string
  title: string
  body: React.ReactNode
}

export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string
  path: string
  updated: string
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <section className="pb-16 pt-[128px] md:pt-[168px]">
      <Container>
        <Breadcrumbs trail={[{ name: title, path }]} />
        <h1 className="display-lg mt-10">{title}</h1>
        <p className="label mt-6">Last updated {updated}</p>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Phones: a collapsed contents list so the policy text starts on screen */}
          <details className="group border-y border-line lg:hidden">
            <summary className="label flex min-h-[48px] items-center justify-between text-fg">
              On this page
              <PlusIcon size={14} className="faq-plus transition-transform duration-300" />
            </summary>
            <ol className="pb-4 text-sm text-muted">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block py-2.5 hover:text-fg">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="label mb-4 text-fg">On this page</p>
              <ol className="border-l border-line text-sm text-muted">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 hover:border-molten hover:text-fg">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="prose-steel max-w-3xl lg:col-span-8 lg:col-start-5">
            <div className="text-lg text-muted [&_p]:text-lg">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2>
                  <span className="text-molten">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </Container>
    </section>
  )
}
