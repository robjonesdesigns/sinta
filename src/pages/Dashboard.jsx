import PageHeader from '../components/layout/PageHeader'

export default function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <main className="page-content">
        <div className="grid grid-cols-3 gap-16">
          <StatCard label="Active Interviews" value="12" />
          <StatCard label="Candidates" value="48" />
          <StatCard label="Completed This Week" value="7" />
        </div>

        <section className="mt-24">
          <h2 className="text-[var(--font-size-md)] font-semibold mb-12">
            Recent Activity
          </h2>
          <div className="card">
            <div className="table-header grid-cols-[1fr_1fr_120px_100px]">
              <span>Candidate</span>
              <span>Interview Type</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            <ActivityRow
              name="Rachele Chandhiok"
              type="Single Interview"
              status="Completed"
              date="Mar 9"
            />
            <ActivityRow
              name="Diana Nambiar"
              type="Panel Interview"
              status="Scheduled"
              date="Mar 12"
            />
            <ActivityRow
              name="Shoaib Knott"
              type="Screening Call"
              status="In Review"
              date="Mar 8"
            />
            <ActivityRow
              name="James Park"
              type="Assessment"
              status="Pending"
              date="Mar 14"
            />
          </div>
        </section>
      </main>
    </>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="card-raised p-20">
      <p className="section-label mb-4">{label}</p>
      <p className="text-[var(--font-size-3xl)] font-semibold">{value}</p>
    </div>
  )
}

const statusStyles = {
  Completed: 'badge-success',
  Scheduled: 'badge-primary',
  'In Review': 'badge-warning',
  Pending: 'badge-neutral',
}

function ActivityRow({ name, type, status, date }) {
  return (
    <div className="table-row grid-cols-[1fr_1fr_120px_100px]">
      <span className="font-medium">{name}</span>
      <span className="text-[var(--color-fg-secondary)]">{type}</span>
      <span>
        <span className={`badge ${statusStyles[status]}`}>{status}</span>
      </span>
      <span className="text-[var(--color-fg-tertiary)]">{date}</span>
    </div>
  )
}
