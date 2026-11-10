const products = [
  {
    id: 1,
    name: 'Dark Ritual',
    origin: 'Ethiopia · Yirgacheffe',
    notes: 'Dark Chocolate · Smoky · Bold',
    roast: 'Dark Roast',
    price: '$24',
  },
  {
    id: 2,
    name: 'Golden Hour',
    origin: 'Colombia · Huila',
    notes: 'Caramel · Stone Fruit · Bright',
    roast: 'Medium Roast',
    price: '$22',
  },
  {
    id: 3,
    name: 'Velvet Dawn',
    origin: 'Brazil · Cerrado',
    notes: 'Hazelnut · Vanilla · Smooth',
    roast: 'Light Roast',
    price: '$20',
  },
]

export default function ProductsSection() {
  return (
    <section className="products-section" id="products">
      <div className="section-container">
        <span className="section-label">Our Coffee</span>
        <h2 className="section-title">Crafted for the Curious</h2>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-visual">
                <div className="product-roast-badge">{p.roast}</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-origin">{p.origin}</p>
                <p className="product-notes">{p.notes}</p>
                <div className="product-footer">
                  <span className="product-price">{p.price} / 250g</span>
                  <button className="btn btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
