import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 46rem;
  padding: 8rem 1rem;
  background: var(--surface-soft);
  overflow: hidden;

  .section-heading {
    position: relative;
    z-index: 2;
    max-width: 36rem;
  }

  .floater {
    position: absolute;
    z-index: 1;
    width: clamp(110px, 16vw, 210px);
    aspect-ratio: 1;
    border-radius: 1.25rem;
    overflow: hidden;
    border: 5px solid var(--surface);
    box-shadow: 0 30px 60px -30px rgba(15, 26, 19, 0.5);

    img { width: 100%; height: 100%; object-fit: cover; display: block; }
  }

  .f1 { top: 8%; left: 6%; }
  .f2 { top: 14%; right: 7%; }
  .f3 { bottom: 4%; left: 12%; }
  .f4 { bottom: 10%; right: 12%; }

  @media (max-width: 767px) {
    .f2, .f3 { display: none; }
    .f1 { top: 3%; left: -4%; }
    .f4 { bottom: 2%; right: -4%; }
  }
`;

export default Wrapper;
