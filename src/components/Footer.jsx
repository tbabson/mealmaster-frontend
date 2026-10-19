import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { Logo, Reveal } from "../components";
import Wrapper from "../assets/wrappers/Footer";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { to: "/meals", label: "Meals" },
      { to: "/nutrition", label: "Nutrition" },
      { to: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Your account",
    links: [
      { to: "/profile", label: "Profile" },
      { to: "/orders", label: "Orders" },
      { to: "/reminders", label: "Reminders" },
      { to: "/cart", label: "Cart" },
    ],
  },
];

const SOCIALS = [
  { href: "https://www.facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.x.com", label: "X", Icon: FaXTwitter },
];

const Footer = () => (
  <Wrapper>
    <Reveal className="footer-card" amount={0.15}>
      <div className="footer-top">
        <div className="brand">
          <Link to="/" className="brand-logo" aria-label="MealMaster home">
            <Logo />
          </Link>
          <p className="brand-copy">
            Recipes, reminders and fresh delivery, so deciding what to eat is
            the easy part of your day.
          </p>
          <div className="socials">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="footer-col">
          <h4>Talk to us</h4>
          <a href="tel:+2347035689102"><FiPhone /> +234 703 5689 102</a>
          <a href="mailto:info@mealmaster.com"><FiMail /> info@mealmaster.com</a>
          <span><FiMapPin /> 151, Acme road, Ogba, Lagos.</span>
        </div>
      </div>

      <p className="wordmark" aria-hidden="true">MealMaster</p>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} MealMaster</span>
        <span>Eat well · Keep it simple</span>
        <span className="legal">
          <Link to="/#">Terms</Link>
          <Link to="/#">Privacy</Link>
        </span>
      </div>
    </Reveal>
  </Wrapper>
);

export default Footer;
