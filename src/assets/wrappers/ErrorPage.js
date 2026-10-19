import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;

  .error-card {
    display: grid;
    justify-items: center;
    gap: 1.1rem;
    max-width: 36rem;
    text-align: center;
  }

  img {
    width: min(420px, 80vw);
    display: block;
    margin-bottom: 0.5rem;
  }

  h1 { font-size: clamp(2.25rem, 6vw, 3.5rem); }

  p {
    color: var(--text-secondary);
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }
`;

export default Wrapper;
