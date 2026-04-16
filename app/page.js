import { AnimateIn } from '../components/AnimateIn'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1 className="hero__title">
          <span className="hero__title-full">Ryan Palmieri</span>
          <span className="hero__title-short">R.P.</span>
        </h1>
        <div className="hero__images">
          <div className="hero__img-left">
            <img src="/headshot.png" alt="Ryan Palmieri" />
          </div>
          <div className="hero__img-right">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop" alt="" />
          </div>
        </div>
      </section>
    </main>
  )
}
