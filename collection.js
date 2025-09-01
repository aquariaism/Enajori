// ===== DYNAMIC COLLECTION PRODUCTS =====

const productList = [
  {
    name: "Mini Bloom Crochet Tulip Pot",
    image: "items/tikla.jpg",
    price: 439,
    category: "crochet",
    badge: "Featured",
    description: "An adorable pink tulip rising from a tiny crocheted pot, complete with textured soil and vibrant green leaves—this cheerful tabletop décor symbolizes joy and renewal."
  },
  {
    name: "Blooming Love Brooch",
    image: "items/boq1.jpg",
    price: 299,
    category: "brooch",
    badge: "Popular",
    description: "A gorgeous handcrafted brooch featuring a full red rose, delicate white daisies, and lush green leaves—all beautifully crocheted with a pearl center."
  },
  {
    name: "Blue Circular Tassel Hanger",
    image: "items/boq4.jpg",
    price: 249,
    category: "brooch",
    badge: "New",
    description: "Striking circular crochet piece featuring earthy brown, vibrant green, white, and deep blue—finished with a playful blue tassel for hanging."
  },
  {
    name: "Soft Cotton Dupatta",
    image: "items/ear1.jpg",
    price: 1299,
    category: "earings",
    badge: "",
    description: "Handwoven cotton dupatta with traditional patterns, perfect for ethnic wear and special occasions."
  },
  {
    name: "Multicolor Wrap",
    image: "items/rose.jpg",
    price: 1499,
    category: "crochet",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/key_chain1.jpg",
    price: 1499,
    category: "crochet",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/boq2.jpg",
    price: 1499,
    category: "brooch",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ear2.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ear3.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/boq3.jpg",
    price: 1499,
    category: "brooch",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ring.jpg",
    price: 1499,
    category: "decor",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ear4.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ear5.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/boq5.jpg",
    price: 1499,
    category: "brooch",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/ear6.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/pinkback.jpg",
    price: 1499,
    category: "earings",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Multicolor Wrap",
    image: "items/proj1.jpg",
    price: 1499,
    category: "brooch",
    badge: "",
    description: "Vibrant multicolor handwoven wrap, versatile and stylish for any season."
  },
  {
    name: "Assam Handloom Saree",
    image: "items/sunflower.jpg",
    price: 3200,
    category: "decor",
    badge: "Premium",
    description: "Traditional Assam handloom saree with intricate patterns, representing the rich cultural heritage of the region."
  }
];

const grid = document.getElementById("collection-grid");
if (grid) {
  grid.innerHTML = "";
  productList.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-category", p.category);
    card.setAttribute("data-price", p.price);
    card.setAttribute("data-name", p.name);
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-overlay">
          <button class="product-view-btn" onclick="openLightbox('${p.image}', '${p.name}')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="product-wishlist-btn">
            <i class="far fa-heart"></i>
          </button>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ""}
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">₹${p.price}</span>
          <button class="btn-primary" onclick="buyNow('${p.name}', '₹${p.price}')">
            <i class="fas fa-shopping-cart"></i>
            Buy Now
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// Loading screen
    window.addEventListener('load', function() {
      document.getElementById('loading-screen').style.display = 'none';
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.getElementById('sort-select');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        productCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Sort functionality
    sortSelect.addEventListener('change', function() {
      const sortBy = this.value;
      const grid = document.getElementById('collection-grid');
      const cards = Array.from(grid.children);
      
      cards.sort((a, b) => {
        switch(sortBy) {
          case 'price-low':
            return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
          case 'price-high':
            return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
          case 'name':
            return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
          default:
            return 0;
        }
      });
      
      cards.forEach(card => grid.appendChild(card));
    });

    // Wishlist functionality
    document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          this.style.color = '#e74c3c';
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
          this.style.color = '';
        }
      });
    });

    // Lightbox functionality
    function openLightbox(imageSrc, caption) {
      const modal = document.getElementById('lightbox-modal');
      const image = document.getElementById('lightbox-image');
      const captionEl = document.getElementById('lightbox-caption');
      
      image.src = imageSrc;
      captionEl.textContent = caption;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    document.getElementById('lightbox-close').addEventListener('click', function() {
      document.getElementById('lightbox-modal').style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    document.getElementById('lightbox-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Buy Now functionality
    function buyNow(productName, price) {
      const subject = encodeURIComponent(`Inquiry about ${productName}`);
      const body = encodeURIComponent(`Hello Enajori,\n\nI am interested in buying "${productName}" priced at ${price}.\nPlease let me know the next steps.\n\nThank you.`);
      const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=enajorimadetomake25@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailURL, '_blank');
    }

    // Newsletter subscription
    document.getElementById('newsletter-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert('Thank you for subscribing! We\'ll keep you updated with our latest products.');
      this.reset();
    });

    // Scroll to top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Load more functionality
    document.getElementById('load-more-btn').addEventListener('click', function() {
      alert('More products will be added soon! Stay tuned for updates.');
    });