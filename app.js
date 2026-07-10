const CONFIG = {
  // WhatsApp debe ir sin +, sin espacios y con lada país.
  // +52 5610836288 => "525610836288"
  whatsappNumber: "525610836288",
  email: "contacto@mapromec.com.mx",
  facebook: "https://www.facebook.com/share/1BUKyNgdzM/?mibextid=wwXlfr",
  instagram: "https://www.instagram.com/mapormec?igsh=MWdrNTVvODZteWNieg%3D%3D&utm_source=qr",
};

const defaultMessage =
  "Hola MAPROMEC, me interesa cotizar una pieza / servicio de maquinado. ¿Me pueden apoyar?";

const galleryImages = [
  "images/gallery-01.jpeg",
  "images/gallery-02.jpeg",
  "images/gallery-03.jpeg",
  "images/gallery-04.jpeg",
  "images/gallery-06.jpeg",
  "images/gallery-07.jpeg",
  "images/gallery-08.jpeg",
  "images/gallery-09.jpeg",
  "images/gallery-10.jpeg",
  "images/gallery-11.jpeg",
  "images/gallery-12.jpeg",
  "images/gallery-13.jpeg",
  "images/gallery-14.jpeg",
  "images/gallery-15.jpeg",
  "images/gallery-16.jpeg",
  "images/gallery-17.jpeg",
  "images/gallery-18.jpeg",
  "images/gallery-19.jpeg",
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function getWhatsAppLink(message = defaultMessage) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getGmailLink() {
  const subject = "Solicitud de cotización MAPROMEC";
  const body = "Hola MAPROMEC, me interesa solicitar una cotización.";

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONFIG.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function setupContactLinks() {
  const whatsappLinks = [
    "#topWhatsApp",
    "#heroWhatsApp",
    "#ctaWhatsApp",
    "#contactWhatsApp",
    "#floatWhatsApp",
  ];

  whatsappLinks.forEach((selector) => {
    const element = $(selector);

    if (element) {
      element.href = getWhatsAppLink();
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });

  const emailLinks = ["#topEmail", "#contactEmail"];

  emailLinks.forEach((selector) => {
    const element = $(selector);

    if (element) {
      element.href = getGmailLink();
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });

  const socialMap = {
    "#contactFacebook": CONFIG.facebook,
    "#floatFacebook": CONFIG.facebook,
    "#contactInstagram": CONFIG.instagram,
    "#floatInstagram": CONFIG.instagram,
  };

  Object.entries(socialMap).forEach(([selector, url]) => {
    const element = $(selector);

    if (element) {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  });
}

function setupMenu() {
  const menuToggle = $("#menuToggle");
  const navMenu = $("#navMenu");

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupRevealAnimations() {
  const elements = $$(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  elements.forEach((element) => observer.observe(element));
}

function renderGallery() {
  const galleryGrid = $("#galleryGrid");

  if (!galleryGrid) return;

  galleryImages.forEach((src, index) => {
    const button = document.createElement("button");
    button.className = "gallery-item reveal";
    button.type = "button";
    button.setAttribute("aria-label", `Ver imagen ${index + 1} de MAPROMEC`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Trabajo de maquinado MAPROMEC ${index + 1}`;
    img.loading = "lazy";

    button.appendChild(img);
    galleryGrid.appendChild(button);

    button.addEventListener("click", () => openLightbox(src));
  });
}

function openLightbox(src) {
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");

  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");

  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function setupLightbox() {
  const lightbox = $("#lightbox");
  const closeButton = $("#closeLightbox");

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

function setupQuoteForm() {
  const form = $("#quoteForm");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#name").value.trim();
    const phone = $("#phone").value.trim();
    const service = $("#service").value;
    const details = $("#details").value.trim();

    const message = `
Hola MAPROMEC, quiero solicitar una cotización.

Nombre: ${name}
Teléfono: ${phone || "No proporcionado"}
Servicio de interés: ${service}
Detalles: ${details || "Pendiente de enviar foto / medidas / plano."}

¿Me pueden apoyar?
    `.trim();

    window.open(getWhatsAppLink(message), "_blank", "noopener,noreferrer");
  });
}

function duplicateStripText() {
  const stripTrack = document.querySelector(".strip-track");

  if (!stripTrack) return;

  stripTrack.innerHTML += stripTrack.innerHTML;
}

function setCurrentYear() {
  const year = $("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupContactLinks();
  setupMenu();
  renderGallery();
  setupLightbox();
  setupQuoteForm();
  duplicateStripText();
  setupRevealAnimations();
  setCurrentYear();
});