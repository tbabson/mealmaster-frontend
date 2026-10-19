import styled from "styled-components";

const Wrapper = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 1rem;
  background: var(--primary);
  color: #fff;

  .section-heading {
    h2 { color: #fff; font-size: clamp(2.5rem, 6vw, 4.75rem); }
    p { color: rgba(255, 255, 255, 0.85); }
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem 1.75rem;
    margin-top: 0.5rem;

    .arrow-link { color: #fff; }
  }
`;

export default Wrapper;
