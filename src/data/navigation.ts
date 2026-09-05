export interface NavLink {
  href: string;
  label: string;
}

export interface Navigation {
  navLinks: NavLink[];
  menuCategories: NavLink[];
}

export const navigation: Navigation = {
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  menuCategories: [
    { href: "/menu?category=beans", label: "Beans" },
    { href: "/menu?category=sides", label: "Sides" },
    { href: "/menu?category=proteins", label: "Proteins" },
  ],
};
