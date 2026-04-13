import PageHeader from '../components/layout/PageHeader'

export default function Interview() {
  return (
    <>
      <PageHeader title="Live Interview" />
      <main className="page-content">
        <p className="text-[var(--color-fg-secondary)]">
          Conduct interviews with real-time signal tagging and guided questions.
        </p>
      </main>
    </>
  )
}
