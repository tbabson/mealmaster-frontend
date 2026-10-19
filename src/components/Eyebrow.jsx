import { PiSparkleFill } from "react-icons/pi";

// Small pill label that sits above section headings
const Eyebrow = ({ children, tone = "light", className = "" }) => (
  <span className={`eyebrow eyebrow-${tone} ${className}`}>
    <PiSparkleFill aria-hidden="true" />
    {children}
  </span>
);

export default Eyebrow;
