export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid">
        {/* LEFT: HELLO.EXE window */}
        <div className="panel hero__window">
          <div className="panel__bar">
            <span className="panel__bar-title">HELLO.EXE</span>
            <span className="panel__bar-controls">
              <span className="panel__bar-ctrl">_</span>
              <span className="panel__bar-ctrl">[ ]</span>
              <span className="panel__bar-ctrl">x</span>
            </span>
          </div>

          <div className="hero__body">
            <h1 className="hero__h1">
              Building<br />brands for<br />the machine<br />age.<span className="hero__cursor" aria-hidden="true" />
            </h1>

            <p className="hero__sub">
              I help frontier tech companies turn complex systems into brands that connect, differentiate, and drive growth.
            </p>
          </div>

          <div className="hero__tags">
            <span className="hero__tag">Brand Strategy</span>
            <span className="hero__tag">GTM</span>
            <span className="hero__tag">Content</span>
            <span className="hero__tag">Growth</span>
          </div>
        </div>

        {/* RIGHT: Computer image — transparent, floats on cream */}
        <div className="hero-image">
          <img src="/assets/computer.png" alt="" />
        </div>
      </div>
    </section>
  )
}
