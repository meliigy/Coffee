export default function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-inner">
        <span className="section-label">Welcome to Aura Coffee</span>
        <h1 className="hero-title">
          Where Every Bean<br />
          <em>Has a Soul</em>
        </h1>
        <p className="hero-desc">
          Single-origin, ethically sourced, roasted to perfection.
          We believe great coffee starts long before the cup.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn btn-primary">Explore Our Blends</a>
          <a href="#story" className="btn btn-ghost">Our Story</a>
        </div>
      </div>
    </section>
  )
}
