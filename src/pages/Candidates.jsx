import PageHeader from '../components/layout/PageHeader'

export default function Candidates() {
  return (
    <>
      <PageHeader title="Candidates" />
      <main className="page-content">
        <p className="text-[var(--color-fg-secondary)]">
          Manage your candidate pipeline and track interview progress.
        </p>
      </main>
    </>
  )
}
