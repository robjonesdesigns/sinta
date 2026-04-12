import PageHeader from '../components/layout/PageHeader'

export default function Scorecard() {
  return (
    <>
      <PageHeader title="Scorecard" />
      <main className="page-content">
        <p className="text-[var(--color-fg-secondary)]">
          Compare candidates across interview rounds with structured evaluations.
        </p>
      </main>
    </>
  )
}
