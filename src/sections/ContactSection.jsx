export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-container contact-inner">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title">Let's Talk Coffee</h2>
        <p className="contact-sub">
          Questions, wholesale inquiries, or just want to chat about beans?
        </p>
        <div className="contact-links">
          <a href="mailto:hello@auracoffee.com" className="contact-link">hello@auracoffee.com</a>
          <a href="#" className="contact-link">@auracoffee</a>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">◈ AURA COFFEE</span>
          <span className="footer-copy">© 2026 Aura Coffee. All rights reserved.</span>
        </div>
      </div>
    </section>
  )
}
