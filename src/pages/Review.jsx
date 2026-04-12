import PageHeader from '../components/layout/PageHeader'

export default function Review() {
  return (
    <>
      <PageHeader title="Post-Interview Review" />
      <main className="page-content">
        <p className="text-[var(--color-fg-secondary)]">
          Review interview recordings, transcripts, and submit evaluations.
        </p>
      </main>
    </>
  )
}
