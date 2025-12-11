export function SectionCard({ title, actions, children, footer }) {
  return (
    <div className="section-card">
      <div className="section-card__header">
        <h3>{title}</h3>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </div>
      <div className="section-card__body">{children}</div>
      {footer ? <div className="section-card__footer">{footer}</div> : null}
    </div>
  )
}
