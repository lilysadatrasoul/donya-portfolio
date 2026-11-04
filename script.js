
const portfolioGrid = document.getElementById("portfolioGrid");
const doraGrid = document.getElementById("doraGrid");
const doraShowAllButton = document.getElementById("doraShowAll");
const filterButtons = document.querySelectorAll(".portfolio-filters button");
const languageToggle = document.getElementById("languageToggle");
const backToTop = document.getElementById("backToTop");

const modal = document.getElementById("artModal");
const modalImage = document.getElementById("modalImage");
const closeModalButton = document.querySelector(".close-modal");
const modalTitle = document.getElementById("modalTitle");
const modalTechnique = document.getElementById("modalTechnique");
const modalYear = document.getElementById("modalYear");
const modalDescription = document.getElementById("modalDescription");
const modalSourceLink = document.getElementById("modalSourceLink");
let previousFocusedElement = null;

let artworks = [];
let doraProducts = [];
let showAllDoraProducts = false;
const featuredDoraIndices = [10, 4, 3, 2];
let currentLanguage = "en";

const translations = {
    en: {
        home: "Home",
        portfolio: "Portfolio",
        about: "About",
        contact: "Contact",
        doraChap: "Dora Chap",

        headerName:"Donya Ghahremani",
        headerDescription:"Artist · Textile Designer · Creative Maker",

        heroName: "Donya Ghahremani",
        heroDescription: "Visual Artist & Textile Designer",
        heroButton: "Explore My Work",
        heroAbout: "I'm a visual artist and textile designer passionate about painting, creative expression, and exploring different forms of art. Through colors, textures, and imagination, I bring my artistic ideas to life.",
        aboutTitle: "About Me",
        aboutLabel: "Get to Know Me",
        aboutParagraph1: "I'm Donya Ghahremani, a visual artist and textile designer with a passion for creativity and artistic exploration.",

        aboutParagraph2: "I have a background in Textile Design and experience in painting, ceramics, and various artistic techniques.",

        aboutParagraph3: "My work is inspired by colors, textures, and the connection between traditional craftsmanship and contemporary design.",

        aboutSkillsTitle: "Creative Fields",

        skillPainting: "Painting",
        skillTextile: "Textile Design",
        skillCeramics: "Ceramics",
        skillPrinting: "Creative Printing",
        skillMixedMedia: "Mixed Media Art",

        portfolioTitle: "Selected Works",
        portfolioDescription: "A collection of art, textures, and creative expression.",

        filterAll: "All",
        filterPainting: "Painting",
        filterTextile: "Textile",
        filterCeramics: "Ceramics",

        doraLabel: "Creative Printing Studio",
        doraTitle: "Dora Chap",
        doraDescription: "Dora Chap is a creative printing brand offering personalized products, artistic designs, and custom-made gifts. From printed mugs to textile products, each piece brings creativity into everyday life.",
        doraEitaa: "Visit Dora Chap on Eitaa ↗",
        doraViewAll: "View All Products",
        doraShowLess: "Show Less",

        contactLabel: "Let's Connect",

        contactTitle: "Contact Me",

        contactDescription: "Interested in my artworks, creative collaborations, or custom printing projects? Feel free to get in touch.",

        contactEitaa: "Visit Dora Chap on Eitaa",

        footerName: "Donya Ghahremani",
        footerTagline: "Art · Design · Creativity",
        footerCopyright: "© 2026 Donya Ghahremani. All rights reserved.",
        modalEitaa: "View Product on Eitaa",
    },

    fa: {
        home: "خانه",
        portfolio: "نمونه‌کارها",
        about: "درباره من",
        contact: "ارتباط با من",
        doraChap: "دورا چاپ",

        headerName:"دنیا قهرمانی",
        headerDescription:"هنرمند · طراح پارچه · خلاق",

        heroName: "دنیا قهرمانی",
        heroDescription: "طراح پارچه و هنرمند تجسمی",
        heroButton: "مشاهده آثار من",
        heroAbout: "من هنرمند تجسمی و طراح پارچه هستم و به نقاشی، بیان خلاقانه و کشف شکل‌های مختلف هنر علاقه دارم. با استفاده از رنگ‌ها، بافت‌ها و تخیل، ایده‌های هنری خود را به واقعیت تبدیل می‌کنم.",
        aboutTitle: "درباره من",
        aboutLabel: "بیشتر با من آشنا شوید",
        aboutParagraph1: "من دنیا قهرمانی، هنرمند تجسمی و طراح پارچه هستم و به خلاقیت و کشف مسیرهای تازه هنری علاقه دارم.",

        aboutParagraph2: "در زمینه طراحی پارچه تحصیل کرده‌ام و در نقاشی، سرامیک و تکنیک‌های مختلف هنری تجربه دارم.",

        aboutParagraph3: "آثار من از رنگ‌ها، بافت‌ها و ارتباط میان هنرهای سنتی و طراحی معاصر الهام می‌گیرند.",

        aboutSkillsTitle: "زمینه‌های هنری",

        skillPainting: "نقاشی",
        skillTextile: "طراحی پارچه",
        skillCeramics: "سرامیک",
        skillPrinting: "چاپ خلاقانه",
        skillMixedMedia: "هنر ترکیبی",

        portfolioTitle: "آثار منتخب",
        portfolioDescription: "مجموعه‌ای از آثار هنری، بافت‌ها و جلوه‌های خلاقانه.",

        filterAll: "همه",
        filterPainting: "نقاشی",
        filterTextile: "طراحی پارچه",
        filterCeramics: "سرامیک",

        doraLabel: "استودیوی چاپ خلاقانه",
        doraTitle: "دورا چاپ",
        doraDescription: "دورا چاپ برندی فعال در زمینه چاپ خلاقانه است که محصولات شخصی‌سازی‌شده، طرح‌های هنری و هدایای سفارشی ارائه می‌دهد. از ماگ‌های چاپی تا محصولات پارچه‌ای، هر اثر جلوه‌ای از خلاقیت را وارد زندگی روزمره می‌کند.",
        doraEitaa: "مشاهده کانال دورا چاپ در ایتا ↗",
        doraViewAll: "مشاهده همه محصولات",
        doraShowLess: "نمایش کمتر",

        contactLabel: "در ارتباط باشیم",

        contactTitle: "ارتباط با من",

        contactDescription: "به آثار هنری من، همکاری‌های خلاقانه یا سفارش‌های چاپ اختصاصی علاقه‌مند هستید؟ خوشحال می‌شوم با من در ارتباط باشید.",

        contactEitaa: "مشاهده دورا چاپ در ایتا",

        footerName: "دنیا قهرمانی",
        footerTagline: "هنر · طراحی · خلاقیت",
        footerCopyright: "© ۲۰۲۶ دنیا قهرمانی. تمامی حقوق محفوظ است.",


        modalEitaa: "مشاهده محصول در ایتا",
    }
};


// Normalize artwork data
function normalizeArtwork(artwork) {
    return {
        ...artwork,
        title:cleanArtworkTitle(artwork.title ?? "Untitled"),
        image: artwork.image ?? "",
        category: artwork.category ?? "other",
        technique: artwork.technique ?? "Not specified",
        year: artwork.year ?? "Not specified"
    };
}


// Load artworks from JSON files
async function loadArtworks() {
    try {
        const [artResponse, doraResponse] = await Promise.all([
            fetch("./artworks.json"),
            fetch("./dora_artworks.json")
        ]);

        if (!artResponse.ok || !doraResponse.ok) {
            throw new Error("Failed to load artworks");
        }

        const artData = await artResponse.json();
        const doraData = await doraResponse.json();

        artworks = artData.map(normalizeArtwork);
        doraProducts = doraData.map(normalizeArtwork);

        renderArtworks(artworks);
        renderDoraProducts();

    } catch (error) {

        portfolioGrid.textContent = "Unable to load artworks.";
    }
}


// Open artwork modal
function openModal(artwork) {
    modalImage.src = artwork.image;
    modalImage.alt = artwork.title;

    modalTitle.textContent = artwork.title;
    modalTechnique.textContent = artwork.technique;
    modalYear.textContent = artwork.year;

    const hasDescription = Boolean(artwork.description);

    modalDescription.hidden = !hasDescription;
    modalDescription.textContent = artwork.description ?? "";

    const hasSourceLink =
        artwork.category === "dora-chap" &&
        typeof artwork.source_url === "string" &&
       /^https:\/\/eitaa\.com\/chap_dora\/\d+\/?$/.test(artwork.source_url);

    modalSourceLink.hidden = !hasSourceLink;

    if (hasSourceLink) {
        modalSourceLink.href = artwork.source_url;
    } else {
        modalSourceLink.removeAttribute("href");
    }

    previousFocusedElement = document.activeElement;
    modal.style.display = "flex";

    const closeButton = document.querySelector(".close-modal");
          closeButton.focus();
}


// Close artwork modal
function closeModal() {
    modal.style.display = "none";

    if (previousFocusedElement?.isConnected) {
    previousFocusedElement.focus();
    }

    previousFocusedElement = null;
}


// Render gallery cards
function renderArtworks(items) {
    portfolioGrid.innerHTML = "";

    items.forEach(artwork => {
        const card = document.createElement("div");
        card.className = "art-card";
        card.dataset.category = artwork.category;

        const wrapper = document.createElement("div");
        wrapper.className = "art-image-wrapper";

        const image = document.createElement("img");
        image.src = artwork.image;
        image.alt = artwork.title;

        const overlay = document.createElement("div");
        overlay.className = "art-overlay";

        const title = document.createElement("h3");
        title.textContent = artwork.title;

        const category = document.createElement("p");
        category.textContent = artwork.category;

        overlay.appendChild(title);
        overlay.appendChild(category);

        wrapper.appendChild(image);
        wrapper.appendChild(overlay);

        card.appendChild(wrapper);

        image.addEventListener("click", () => {
            openModal(artwork);
        });

        portfolioGrid.appendChild(card);
    });
}
// Render dora chop cards
function renderDoraProducts() {
    doraGrid.innerHTML = "";

    const featuredProducts = featuredDoraIndices.map(index => {
        return doraProducts[index];
    });
    const selectedProducts = showAllDoraProducts
        ? doraProducts
        : featuredProducts;


    selectedProducts.forEach(product => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "dora-card";
        card.setAttribute("aria-label", `View ${product.title}`);

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;

        const title = document.createElement("h3");
        title.textContent = product.short_title || product.title;


        card.addEventListener("click", () => {
            openModal(product);
        });

        card.appendChild(image);
        card.appendChild(title);

        doraGrid.appendChild(card);
    });

    doraShowAllButton.textContent = showAllDoraProducts
    ? translations[currentLanguage].doraShowLess
    : translations[currentLanguage].doraViewAll;

    doraShowAllButton.setAttribute(
        "aria-expanded",
        String(showAllDoraProducts)
    );
}

doraShowAllButton.addEventListener("click", () => {
    showAllDoraProducts = !showAllDoraProducts;

    renderDoraProducts();
});


// Filter artworks by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filteredArtworks = category === "all"
            ? artworks
            : artworks.filter(artwork => artwork.category === category);

        renderArtworks(filteredArtworks);
    });
});

//clean titles
function cleanArtworkTitle(title) {
  return title
    .replace(/\s+/g, " ")
    .trim();
}


//fa or en
function updateLanguage() {

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
    currentLanguage === "fa" ? "rtl" : "ltr";

    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(element => {
        const key = element.dataset.i18n;

        const translatedText = translations[currentLanguage][key];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        } else {
            console.warn(`Missing translation: ${currentLanguage}.${key}`);
        }
    });

    doraShowAllButton.textContent = showAllDoraProducts
    ? translations[currentLanguage].doraShowLess
    : translations[currentLanguage].doraViewAll;
}

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "fa" : "en";
     updateLanguage();
});

//back to top
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// Modal close events
closeModalButton.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});


// Start application
loadArtworks();



