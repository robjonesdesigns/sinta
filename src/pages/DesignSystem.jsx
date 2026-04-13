import PageHeader from '../components/layout/PageHeader'
import { stageTypes } from '../data/stages'
import {
  Check,
  WarningCircle,
  ArrowRight,
  Plus,
  MagnifyingGlass,
  Clock,
  Users,
  Star,
} from '@phosphor-icons/react'

export default function DesignSystem() {
  return (
    <>
      <PageHeader title="Design System" />
      <main className="page-content">
        <div className="max-w-960">
          <p className="type-body-secondary mb-32">
            Sinta HR design system. Clash Grotesk for display, Inter for body.
          </p>

          <ColorSection />
          <TypographySection />
          <ComponentSection />
          <IconSection />
          <SpacingSection />
        </div>
      </main>
    </>
  )
}

/* ── Colors ────────────────────────────────────────────────── */

function ColorSection() {
  return (
    <Section title="Colors">
      <div className="flex flex-col gap-24">
        <ColorGroup
          label="Background"
          colors={[
            { name: 'bg', var: '--color-bg' },
            { name: 'bg-subtle', var: '--color-bg-subtle' },
            { name: 'bg-muted', var: '--color-bg-muted' },
            { name: 'bg-inset', var: '--color-bg-inset' },
          ]}
        />
        <ColorGroup
          label="Surface"
          colors={[
            { name: 'surface', var: '--color-surface' },
            { name: 'surface-raised', var: '--color-surface-raised' },
            { name: 'surface-overlay', var: '--color-surface-overlay' },
          ]}
        />
        <ColorGroup
          label="Border"
          colors={[
            { name: 'border', var: '--color-border' },
            { name: 'border-subtle', var: '--color-border-subtle' },
            { name: 'border-strong', var: '--color-border-strong' },
          ]}
        />
        <ColorGroup
          label="Foreground"
          colors={[
            { name: 'fg', var: '--color-fg' },
            { name: 'fg-secondary', var: '--color-fg-secondary' },
            { name: 'fg-tertiary', var: '--color-fg-tertiary' },
          ]}
        />
        <ColorGroup
          label="Primary"
          colors={[
            { name: 'primary', var: '--color-primary' },
            { name: 'primary-hover', var: '--color-primary-hover' },
            { name: 'primary-subtle', var: '--color-primary-subtle' },
          ]}
        />
        <ColorGroup
          label="Status"
          colors={[
            { name: 'success', var: '--color-success' },
            { name: 'success-subtle', var: '--color-success-subtle' },
            { name: 'warning', var: '--color-warning' },
            { name: 'warning-subtle', var: '--color-warning-subtle' },
            { name: 'danger', var: '--color-danger' },
            { name: 'danger-subtle', var: '--color-danger-subtle' },
          ]}
        />
        <ColorGroup
          label="Stage Types"
          colors={stageTypes.map((s) => ({
            name: s.label,
            value: s.color,
          }))}
        />
      </div>
    </Section>
  )
}

function ColorGroup({ label, colors }) {
  return (
    <div>
      <p className="type-label mb-10">{label}</p>
      <div className="flex flex-wrap gap-8">
        {colors.map((c) => (
          <div key={c.name} className="flex flex-col items-center gap-6">
            <div
              className="w-56 h-56 rounded-lg border border-[var(--color-border)]"
              style={{ background: c.value || `var(${c.var})` }}
            />
            <span className="type-meta text-center">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Typography ────────────────────────────────────────────── */

function TypographySection() {
  return (
    <Section title="Typography">
      <div className="flex flex-col gap-20">
        <TypeRow
          className="type-display"
          label="type-display"
          desc="Clash Grotesk 700, 30px, -0.02em"
          sample="Interview Pipeline"
        />
        <TypeRow
          className="type-page-title"
          label="type-page-title"
          desc="Clash Grotesk 700, 20px, -0.01em"
          sample="Interview Builder"
        />
        <TypeRow
          className="type-section-heading"
          label="type-section-heading"
          desc="Clash Grotesk 600, 18px"
          sample="Create Interview Template"
        />
        <TypeRow
          className="type-card-title"
          label="type-card-title"
          desc="Clash Grotesk 600, 14px"
          sample="Screening Call"
        />
        <TypeRow
          className="type-body"
          label="type-body"
          desc="Inter 400, 14px"
          sample="Build your interview pipeline by adding stages."
        />
        <TypeRow
          className="type-body-secondary"
          label="type-body-secondary"
          desc="Inter 400, 14px, secondary color"
          sample="Click a stage to configure interviewers and scorecards."
        />
        <TypeRow
          className="type-label"
          label="type-label"
          desc="Clash Grotesk 600, 12px, uppercase"
          sample="Duration"
        />
        <TypeRow
          className="type-meta"
          label="type-meta"
          desc="Inter 400, 12px, tertiary color"
          sample="45 min, 3 interviewers"
        />
        <TypeRow
          className="type-stat"
          label="type-stat"
          desc="Clash Grotesk 700, 30px, tabular-nums"
          sample="48"
        />
        <TypeRow
          className="type-data"
          label="type-data"
          desc="Inter 600, 14px, tabular-nums"
          sample="4.8 / 5.0"
        />
      </div>
    </Section>
  )
}

function TypeRow({ className, label, desc, sample }) {
  return (
    <div className="flex items-baseline gap-24 pb-16 border-b border-[var(--color-border-subtle)]">
      <div className="w-200 flex-shrink-0">
        <code className="type-meta font-mono text-[var(--color-primary)]">
          .{label}
        </code>
        <p className="type-meta mt-2">{desc}</p>
      </div>
      <p className={className}>{sample}</p>
    </div>
  )
}

/* ── Components ────────────────────────────────────────────── */

function ComponentSection() {
  return (
    <Section title="Components">
      <div className="flex flex-col gap-32">
        <ComponentGroup label="Buttons">
          <div className="flex flex-wrap items-center gap-8">
            <button className="btn btn-primary">
              Primary
            </button>
            <button className="btn btn-primary">
              <Plus size={16} /> With Icon
            </button>
            <button className="btn btn-secondary">
              Secondary
            </button>
            <button className="btn btn-ghost">
              Ghost
            </button>
            <button className="btn btn-danger">
              Danger
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-8 mt-12">
            <button className="btn btn-primary btn-sm">
              Small
            </button>
            <button className="btn btn-primary">
              Default
            </button>
            <button className="btn btn-primary btn-lg">
              Large
            </button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Badges">
          <div className="flex flex-wrap items-center gap-8">
            <span className="badge badge-neutral">Neutral</span>
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-success">
              <Check size={11} weight="bold" /> Success
            </span>
            <span className="badge badge-warning">
              <WarningCircle size={11} weight="regular" /> Warning
            </span>
            <span className="badge badge-danger">Danger</span>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Inputs">
          <div className="flex flex-col gap-8 max-w-320">
            <input className="input" placeholder="Default input" />
            <div className="relative">
              <MagnifyingGlass
                className="absolute left-10 top-1/2 -translate-y-1/2 text-[var(--color-fg-tertiary)]"
                size={16}
                weight="regular"
              />
              <input className="input pl-34" placeholder="With icon" />
            </div>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Cards">
          <div className="flex gap-16">
            <div className="card p-16 w-200">
              <p className="type-card-title">Card</p>
              <p className="type-meta mt-4">
                Border, no shadow
              </p>
            </div>
            <div className="card-raised p-16 w-200">
              <p className="type-card-title">Card Raised</p>
              <p className="type-meta mt-4">
                Border + shadow
              </p>
            </div>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Status Pills">
          <div className="flex items-center gap-12">
            <span className="inline-flex items-center gap-4 px-8 py-2 rounded-full text-[var(--font-size-xs)] font-medium bg-[var(--color-success-subtle)] text-[var(--color-success)]">
              <Check size={11} weight="bold" />
              Ready
            </span>
            <span className="inline-flex items-center gap-4 px-8 py-2 rounded-full text-[var(--font-size-xs)] font-medium bg-[var(--color-warning-subtle)] text-[var(--color-warning)]">
              <WarningCircle size={11} weight="regular" />
              Setup
            </span>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Avatars">
          <div className="flex items-center gap-12">
            <div className="avatar-initials avatar-initials-sm">DN</div>
            <div className="avatar-initials">DN</div>
            <div className="flex items-center -space-x-6">
              <div className="avatar-initials avatar-initials-sm">DN</div>
              <div className="avatar-initials avatar-initials-sm">SK</div>
              <div className="avatar-initials avatar-initials-sm">JP</div>
            </div>
          </div>
        </ComponentGroup>

        <ComponentGroup label="Dividers">
          <div className="flex items-center gap-12">
            <span className="type-meta">Left</span>
            <div className="divider-v" />
            <span className="type-meta">Right</span>
          </div>
          <div className="divider-h mt-12" />
        </ComponentGroup>

        <ComponentGroup label="Stage Icons">
          <div className="flex flex-wrap gap-12">
            {stageTypes.map((stage) => {
              const Icon = stage.icon
              return (
                <div key={stage.id} className="flex flex-col items-center gap-6">
                  <div
                    className="stage-icon-box"
                    style={{ '--stage-color': stage.color }}
                  >
                    <Icon
                      size={18}
                      style={{ color: stage.color }}
                      weight="duotone"
                    />
                  </div>
                  <span className="type-meta">{stage.label}</span>
                </div>
              )
            })}
          </div>
        </ComponentGroup>
      </div>
    </Section>
  )
}

/* ── Icons ──────────────────────────────────────────────────── */

function IconSection() {
  const icons = [
    { Icon: MagnifyingGlass, name: 'MagnifyingGlass' },
    { Icon: Plus, name: 'Plus' },
    { Icon: Check, name: 'Check' },
    { Icon: WarningCircle, name: 'WarningCircle' },
    { Icon: ArrowRight, name: 'ArrowRight' },
    { Icon: Clock, name: 'Clock' },
    { Icon: Users, name: 'Users' },
    { Icon: Star, name: 'Star' },
  ]

  return (
    <Section title="Icons">
      <p className="type-body-secondary mb-16">
        Phosphor Icons. weight="regular" for UI chrome, weight="duotone" for stage/signal icons.
      </p>
      <div className="flex flex-wrap gap-16">
        {icons.map(({ Icon, name }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-6 p-12 rounded-lg border border-[var(--color-border-subtle)] w-80"
          >
            <Icon size={20} weight="regular" />
            <span className="type-meta">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── Spacing ───────────────────────────────────────────────── */

function SpacingSection() {
  const radii = [
    { name: 'sm', value: '4px' },
    { name: 'md', value: '6px' },
    { name: 'lg', value: '8px' },
    { name: 'xl', value: '12px' },
    { name: 'full', value: '9999px' },
  ]

  const shadows = ['xs', 'sm', 'md', 'lg']

  return (
    <Section title="Radius & Shadows">
      <div className="flex flex-col gap-24">
        <div>
          <p className="type-label mb-10">Border Radius</p>
          <div className="flex flex-wrap gap-12">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-6">
                <div
                  className="w-48 h-48 bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]"
                  style={{ borderRadius: `var(--radius-${r.name})` }}
                />
                <span className="type-meta">{r.name}</span>
                <span className="type-meta">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="type-label mb-10">Shadows</p>
          <div className="flex flex-wrap gap-16">
            {shadows.map((s) => (
              <div
                key={s}
                className="w-80 h-56 rounded-lg bg-[var(--color-surface)] flex items-center justify-center"
                style={{ boxShadow: `var(--shadow-${s})` }}
              >
                <span className="type-meta">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── Shared ────────────────────────────────────────────────── */

function Section({ title, children }) {
  return (
    <section className="mb-48">
      <h2 className="type-section-heading mb-20 pb-12 border-b border-[var(--color-border)]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ComponentGroup({ label, children }) {
  return (
    <div>
      <p className="type-label mb-10">{label}</p>
      {children}
    </div>
  )
}
