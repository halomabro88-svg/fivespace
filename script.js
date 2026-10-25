/*
 FIVESPACE — konfigurasi website
 PENTING: ganti nomor dan tautan contoh di bawah sebelum website dipakai pelanggan.
 Nomor WhatsApp: kode negara + nomor, tanpa tanda +, spasi, atau angka 0 di depan.
 Contoh Indonesia: 081234567890 menjadi 6281234567890.
*/
const FIVESPACE_CONFIG = {
  whatsappNumber: "62881027563249", // GANTI dengan nomor WhatsApp Ahmad Zulfikar
  links: {
    shopee: "",      // Tempel URL toko Shopee
    tokopedia: "",   // Tempel URL toko Tokopedia
    instagram: "",   // Tempel URL profil Instagram
    tiktok: ""       // Tempel URL profil TikTok
  }
};

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3500);
}
function cleanPhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}
function openWhatsApp(message) {
  const number = cleanPhone(FIVESPACE_CONFIG.whatsappNumber);
  if (!number || number === "6281234567890") {
    showToast("Nomor WhatsApp masih contoh. Ganti whatsappNumber di script.js terlebih dahulu.");
    return;
  }
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}
document.querySelectorAll(".order-button").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("productSelect").value = button.dataset.product;
    document.getElementById("pesan").scrollIntoView({behavior:"smooth"});
    document.getElementById("customerName").focus({preventScroll:true});
  });
});
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const product = document.getElementById("productSelect").value;
  const size = document.getElementById("sizeSelect").value;
  const color = document.getElementById("colorSelect").value;
  const note = document.getElementById("orderNote").value.trim();
  const message = [
    "Halo FIVESPACE! Saya ingin memesan hoodie.",
    "",
    `Nama: ${name}`,
    `Produk: ${product}`,
    `Ukuran: ${size}`,
    `Warna: ${color}`,
    note ? `Catatan: ${note}` : "",
    "",
    "Mohon info stok, total pembayaran, promo, dan ongkir. Terima kasih!"
  ].filter(Boolean).join("\n");
  openWhatsApp(message);
});
document.getElementById("closingWhatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp("Halo FIVESPACE! Saya ingin bertanya tentang koleksi hoodie. Bisa dibantu cek stok dan promo yang tersedia?");
});
document.getElementById("footerWhatsapp").addEventListener("click", event => {
  event.preventDefault();
  openWhatsApp("Halo Ahmad Zulfikar, saya ingin bertanya tentang produk FIVESPACE.");
});
document.querySelectorAll("[data-config-link]").forEach(link => {
  const key = link.dataset.configLink;
  const url = FIVESPACE_CONFIG.links[key];
  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#";
    link.addEventListener("click", event => {
      event.preventDefault();
      showToast(`Tautan ${key} belum diatur. Isi FIVESPACE_CONFIG.links.${key} di script.js.`);
    });
  }
});
