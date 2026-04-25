export default function LogoBar() {
  const logos = ['gaia', 'Samsung', 'Nike', 'DC', 'Protocol Labs', 'polygon', 'Filecoin']

  return (
    <section className="logobar">
      <div className="panel">
        <div className="logobar__label-row">
          <span className="logobar__label">Trusted by Builders &amp; Innovators</span>
          <span className="logobar__label">Past &amp; Present Collaborations</span>
        </div>
        <div className="logobar__row">
          <span className="logobar__arrow">&larr;</span>
          <div className="logobar__logos">
            {logos.map((logo) => (
              <span key={logo} className="logobar__logo">{logo}</span>
            ))}
          </div>
          <span className="logobar__arrow">&rarr;</span>
        </div>
      </div>
    </section>
  )
}
