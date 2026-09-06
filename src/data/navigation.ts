export interface NavLink {
  href: string;
  label: string;
}

export interface Navigation {
  navLinks: NavLink[];
}

export const navigation: Navigation = {
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};
