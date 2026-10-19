import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;

  .meals-layout {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 268px 1fr;
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 860px) {
    .meals-layout {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
`;

export default Wrapper;
