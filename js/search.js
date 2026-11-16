
document.addEventListener("DOMContentLoaded", async function () {

  const params = new URLSearchParams(window.location.search);
  const keyword = (params.get("q") || "").trim().toLowerCase();

  const message = document.getElementById("shafia_search-message");
  const results = document.getElementById("shafia_search-results");

  const pages = [
    { title: "Beranda", url: "index.html" },
    { title: "Kenapa WHISKAS®", url: "about.html" },
    { title: "Produk", url: "products.html" },
    { title: "Panduan Memberi Makan", url: "nutrition.html" },
    { title: "Perawatan Kucing", url: "cat-care.html" },
    { title: "Dunia Kucing", url: "lifestyle.html" },
    { title: "Ras Kucing", url: "ras-kucing.html" },
    { title: "Fakta Kucing", url: "fakta-kucing.html" }
  ];

  if (!keyword) {
    message.textContent = "Masukkan kata kunci pada kolom pencarian.";
    return;
  }

  message.textContent = `Mencari "${keyword}"...`;

  const words = keyword.split(/\s+/).filter(Boolean);
  const found = [];

  for (const page of pages) {
    try {
      const response = await fetch(page.url);

      if (!response.ok) continue;

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Hilangkan bagian navigasi dan kode yang tidak perlu dicari
      doc.querySelectorAll("header, footer, nav, script, style, form").forEach(el => el.remove());

      const content = (doc.body.innerText || "")
        .replace(/\s+/g, " ")
        .trim();

      const normalized = content.toLowerCase();

      if (words.every(word => normalized.includes(word))) {
        const index = normalized.indexOf(words[0]);
        const start = Math.max(0, index - 80);
        const snippet = content.slice(start, start + 220);

        found.push({
          title: page.title,
          url: page.url,
          snippet: snippet
        });
      }

    } catch (error) {
      console.error("Gagal mencari halaman:", page.url, error);
    }
  }

  results.innerHTML = "";

  if (found.length === 0) {
    message.textContent = `Tidak ditemukan hasil untuk "${keyword}".`;

    results.innerHTML = `
      <div class="shafia_search-empty">
        Coba gunakan kata kunci lain, ya!
      </div>
    `;

    return;
  }

  message.textContent = `Ditemukan ${found.length} halaman untuk "${keyword}".`;

  found.forEach(item => {
    const card = document.createElement("article");
    card.className = "shafia_search-item";

    const heading = document.createElement("h2");
    heading.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.snippet + "...";

    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = "Kunjungi halaman →";

    card.append(heading, description, link);
    results.appendChild(card);
  });

});
