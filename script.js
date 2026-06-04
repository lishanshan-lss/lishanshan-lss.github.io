const year = document.querySelector("#year");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav a, .site-name");

if (year) {
  year.textContent = new Date().getFullYear();
}

function showSection(sectionId) {
  const target = document.querySelector(sectionId);

  if (!target) {
    return;
  }

  sections.forEach((section) => {
    section.classList.toggle("is-active", section === target);
  });

  const viewClasses = [
    "view-intro",
    "view-academic",
    "view-fun",
    "view-past-lives",
    "view-company",
  ];
  const viewClass = `view-${sectionId.slice(1)}`;

  document.body.classList.remove(...viewClasses);
  document.body.classList.add(viewClass);

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === sectionId;
    link.classList.toggle("is-active", isCurrent);

    if (isCurrent && link.closest(".nav")) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href");

    if (!sectionId || !sectionId.startsWith("#")) {
      return;
    }

    event.preventDefault();
    showSection(sectionId);
    history.replaceState(null, "", sectionId);
  });
});

if (window.location.hash) {
  showSection(window.location.hash);
}
