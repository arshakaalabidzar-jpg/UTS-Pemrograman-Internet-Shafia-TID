
/* Interaksi website Whiskas — project UTS Pemrograman Web */
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("shafia_menu-toggle");
  const nav = document.getElementById("shafia_nav");

  // Navigasi mobile
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Menandai halaman yang sedang dibuka pada navigasi
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".shafia_nav a[data-page]").forEach((link) => {
    if (link.dataset.page === currentFile) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
  });

  // Filter katalog produk
  const filterButtons = document.querySelectorAll(".shafia_filter");
  const productCards = document.querySelectorAll(".shafia_catalog-card");
  const productCount = document.getElementById("shafia_product-count");

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.filter;
        let visible = 0;

        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        productCards.forEach((card) => {
          const show = selected === "all" || card.dataset.category === selected;
          card.classList.toggle("is-hidden", !show);
          if (show) visible += 1;
        });

        if (productCount) {
          productCount.textContent = `${visible} item${visible === 1 ? "" : "s"}`;
        }
      });
    });
  }

  // Validasi dan pengiriman form kontak
const contactForm = document.getElementById("shafia_contact-form");

if (contactForm) {
  const status = document.getElementById("shafia_form-status");

  const showError = (field, message) => {
    const errorElement = contactForm.querySelector(`[data-error="${field}"]`);
    if (errorElement) errorElement.textContent = message;
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const subject = contactForm.elements.subject.value;
    const message = contactForm.elements.message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    ["name", "email", "subject", "message"].forEach((field) => {
      showError(field, "");
    });

    if (status) status.textContent = "";

    if (name.length < 2) {
      showError("name", "Nama minimal terdiri dari 2 karakter.");
      valid = false;
    }

    if (!emailPattern.test(email)) {
      showError("email", "Masukkan alamat email yang valid.");
      valid = false;
    }

    if (!subject) {
      showError("subject", "Silakan pilih topik pesan.");
      valid = false;
    }

    if (message.length < 10) {
      showError("message", "Pesan minimal terdiri dari 10 karakter.");
      valid = false;
    }

    if (!valid) return;

    if (status) {
      status.textContent = "Mengirim pesan...";
    }

    contactForm.submit();
  });

  contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => {
      const errorElement = contactForm.querySelector(
        `[data-error="${field.name}"]`
      );

      if (errorElement) errorElement.textContent = "";
      if (status) status.textContent = "";
    });

    field.addEventListener("change", () => {
      const errorElement = contactForm.querySelector(
        `[data-error="${field.name}"]`
      );

      if (errorElement) errorElement.textContent = "";
    });
  });
}
    });

    contactForm.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("input", () => {
        const errorElement = contactForm.querySelector(`[data-error="${field.name}"]`);
        if (errorElement) errorElement.textContent = "";
        if (status) status.textContent = "";
      });
      field.addEventListener("change", () => {
        const errorElement = contactForm.querySelector(`[data-error="${field.name}"]`);
        if (errorElement) errorElement.textContent = "";
      });
    });
  }
});


// =====================================
// FORM PANDUAN MAKAN KUCING
// =====================================

const catForm = document.getElementById("shafia_cat-form");

if (catForm) {
  catForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("shafia_cat-name");
    const ageInput = document.getElementById("shafia_cat-age");
    const weightInput = document.getElementById("shafia_cat-weight");
    const result = document.getElementById("shafia_cat-result");

    const catName = nameInput.value.trim();
    const catAge = ageInput.value;
    const catWeight = Number(weightInput.value);

    if (!catName || !catAge || !weightInput.value || !Number.isFinite(catWeight) || catWeight < 0.1 || catWeight > 50) {
      result.hidden = false;
      result.innerHTML = `
        <div class="shafia_cat-error">
          <strong>Data belum lengkap!</strong>
          <p>Silakan isi nama, usia, dan berat badan kucing dengan benar.</p>
        </div>
      `;
      return;
    }

    let ageLabel = "";
    let recommendation = "";
    let ageDescription = "";

    if (catAge === "kitten") {
      ageLabel = "Anak Kucing";
      ageDescription = "di bawah 1 tahun";
      recommendation = `
        <h4>🐾 Panduan Anak Kucing</h4>
        <p>
          Anak kucing sedang berada dalam masa pertumbuhan.
          Pilih makanan yang diformulasikan khusus untuk anak kucing
          dan ikuti petunjuk pemberian makan pada kemasan.
        </p>
      `;
    } else if (catAge === "adult") {
      ageLabel = "Kucing Dewasa";
      ageDescription = "1–7 tahun";
      recommendation = `
        <h4>♡ Panduan Kucing Dewasa</h4>
        <p>
          Kucing dewasa membutuhkan makanan dengan nutrisi seimbang
          untuk mendukung aktivitas hariannya. Sesuaikan pemberian
          makanan dengan petunjuk pada kemasan produk.
        </p>
      `;
    } else {
      ageLabel = "Kucing Senior";
      ageDescription = "di atas 7 tahun";
      recommendation = `
        <h4>☼ Panduan Kucing Senior</h4>
        <p>
          Kebutuhan kucing senior dapat berubah seiring bertambahnya
          usia. Perhatikan kondisi tubuhnya dan konsultasikan
          pilihan makanan dengan dokter hewan.
        </p>
      `;
    }

    result.hidden = false;

    result.innerHTML = `
      <div class="shafia_cat-result-content">

        <span class="shafia_cat-result-icon">🐱</span>

        <span class="shafia_eyebrow">PROFIL KUCINGMU</span>

        <h3>Halo, ${escapeCatText(catName)}!</h3>

        <div class="shafia_cat-result-data">
          <div>
            <span>Nama</span>
            <strong>${escapeCatText(catName)}</strong>
          </div>

          <div>
            <span>Usia</span>
            <strong>${ageLabel}</strong>
          </div>

          <div>
            <span>Berat badan</span>
            <strong>${catWeight.toLocaleString("id-ID")} kg</strong>
          </div>
        </div>

        <div class="shafia_cat-result-guide">
          ${recommendation}
        </div>

        <div class="shafia_cat-result-reminder">
          <strong>Ingat ya!</strong>
          <p>
            Periksa tabel takaran makanan berdasarkan usia dan
            berat badan pada kemasan WHISKAS®. Berat badan saja
            belum cukup untuk menentukan jumlah makanan harian.
          </p>
        </div>

        <a href="#shafia_transition-section"
          class="shafia_cat-result-link">
          Pelajari cara memperkenalkan makanan baru →
        </a>

      </div>
    `;

    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}

// Mengamankan teks nama sebelum ditampilkan ke halaman
function escapeCatText(text) {
  return text.replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".shafia_nav > a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("is-current");
    } else {
      link.classList.remove("is-current");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".shafia_nav a, .shafia_utility > a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("is-current");
    } else {
      link.classList.remove("is-current");
    }
  });
});
