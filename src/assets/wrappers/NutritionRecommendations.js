import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 3rem;

  .nr-head {
    margin-bottom: 1.25rem;
  }

  .nr-head h2 {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0 0 0.4rem;
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  .nr-head h2 svg {
    color: var(--primary, #28842b);
  }

  .nr-summary {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.7;
    color: #5c6370;
    max-width: 70ch;
  }

  .nr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.15rem;
  }

  .nr-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .nr-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
  }

  .nr-img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
    background: var(--lightest, #f4faf4);
  }

  .nr-body {
    padding: 0.95rem 1.05rem 1.1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .nr-name {
    margin: 0 0 0.3rem;
    font-size: 1rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  .nr-meta {
    font-size: 0.76rem;
    color: #7b8794;
    margin-bottom: 0.55rem;
  }

  .nr-reason {
    font-size: 0.86rem;
    line-height: 1.65;
    color: #475569;
    margin: 0 0 0.8rem;
  }

  .nr-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.32rem;
    margin-bottom: 0.85rem;
  }

  .nr-tags span {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.52rem;
    border-radius: 99px;
    background: #eaf5ea;
    color: var(--primary, #28842b);
    text-transform: capitalize;
  }

  .nr-macros {
    display: flex;
    gap: 0.85rem;
    font-size: 0.74rem;
    color: #64748b;
    padding-top: 0.7rem;
    border-top: 1px solid #f1f5f9;
    margin-top: auto;
  }

  .nr-macros b {
    color: var(--dark, #143315);
  }

  .nr-link {
    margin-top: 0.8rem;
    font-size: 0.83rem;
    font-weight: 700;
    color: var(--primary, #28842b);
    text-decoration: none;
  }

  .nr-link:hover {
    text-decoration: underline;
  }

  .nr-note {
    margin: 1.15rem 0 0;
    font-size: 0.76rem;
    color: #94a3b8;
    line-height: 1.65;
  }

  .nr-skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 1.15rem;
  }

  .nr-skeleton div {
    height: 230px;
    border-radius: 14px;
    background: linear-gradient(90deg, #f4f6f8 25%, #eceff2 37%, #f4f6f8 63%);
    background-size: 400% 100%;
    animation: nr-shimmer 1.3s ease-in-out infinite;
  }

  @keyframes nr-shimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default Wrapper;
