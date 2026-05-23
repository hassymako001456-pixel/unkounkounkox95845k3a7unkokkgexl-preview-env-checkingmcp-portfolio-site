document.addEventListener("DOMContentLoaded", () => {
  const mobileQuery = window.matchMedia("(max-width: 680px)");

  document.querySelectorAll(".site-header").forEach((header, index) => {
    const nav = header.querySelector(".nav");
    const contactLink = nav?.querySelector(".contact-link");
    const brand = header.querySelector(".brand");

    if (!nav || !contactLink || !brand) {
      return;
    }

    const navLinks = [...nav.querySelectorAll("a")];
    const menuLinks = navLinks.map((link) => ({
      href: link.getAttribute("href") || "#",
      text: link.textContent.trim(),
      active: link.classList.contains("active"),
    }));

    const toggle = document.createElement("button");
    const panelId = `mobile-menu-panel-${index + 1}`;

    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", panelId);
    toggle.setAttribute("aria-label", "メニューを開く");
    toggle.innerHTML = '<span class="mobile-menu-toggle-line" aria-hidden="true"></span>';

    const panel = document.createElement("div");
    panel.className = "mobile-menu-panel";
    panel.id = panelId;
    panel.hidden = true;

    const menuNav = document.createElement("nav");
    menuNav.className = "mobile-menu-nav";
    menuNav.setAttribute("aria-label", "モバイルナビゲーション");

    menuLinks.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.text;
      if (item.active) {
        link.classList.add("active");
      }
      menuNav.appendChild(link);
    });

    panel.appendChild(menuNav);
    nav.insertBefore(toggle, contactLink);
    header.appendChild(panel);

    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "メニューを開く");
      panel.hidden = true;
      header.classList.remove("menu-open");
      document.body.classList.remove("mobile-menu-open");
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "メニューを閉じる");
      panel.hidden = false;
      header.classList.add("menu-open");
      document.body.classList.add("mobile-menu-open");
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        document.querySelectorAll(".site-header.menu-open").forEach((openHeader) => {
          openHeader.classList.remove("menu-open");
          const openPanel = openHeader.querySelector(".mobile-menu-panel");
          const openToggle = openHeader.querySelector(".mobile-menu-toggle");
          if (openPanel) {
            openPanel.hidden = true;
          }
          if (openToggle) {
            openToggle.setAttribute("aria-expanded", "false");
            openToggle.setAttribute("aria-label", "メニューを開く");
          }
        });
        document.body.classList.remove("mobile-menu-open");
        openMenu();
      }
    });

    menuNav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    mobileQuery.addEventListener("change", (event) => {
      if (!event.matches) {
        closeMenu();
      }
    });
  });
});
