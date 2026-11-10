export default function StorySection() {
  return (
    <section className="story-section" id="story">
      <div className="section-container story-grid">
        <div className="story-visual">
          <div className="story-image-placeholder">
            <span>◈</span>
          </div>
        </div>
        <div className="story-content">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">Born from a Love<br /><em>of the Craft</em></h2>
          <p className="story-text">
            Aura Coffee began in a small roastery, with a simple belief:
            that coffee is more than a beverage — it is a ritual, a moment,
            a connection between the farmer's hands and your cup.
          </p>
          <p className="story-text">
            We work directly with growers across Ethiopia, Colombia, and Brazil,
            ensuring fair trade and sustainable practices at every step of the journey.
          </p>
          <div className="story-stats">
            <div className="stat">
              <span className="stat-num">12+</span>
              <span className="stat-label">Origins</span>
            </div>
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Ethically Sourced</span>
            </div>
            <div className="stat">
              <span className="stat-num">8yr</span>
              <span className="stat-label">Of Roasting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
