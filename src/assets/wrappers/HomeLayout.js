import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;

  .main-content {
    flex-grow: 1;
    width: 100%;
    /* room for the floating navbar */
    padding: 7rem 1rem 0;
  }

  /* the landing page runs edge to edge; its hero handles the navbar offset */
  .main-content.is-flush {
    padding: 0;
  }
`;

export default Wrapper;
