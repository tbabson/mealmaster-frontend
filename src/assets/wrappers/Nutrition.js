import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;

  .page-head {
    margin-bottom: 2rem;
  }

  .page-head h1 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.5rem;
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  .page-head h1 svg {
    color: var(--primary, #28842b);
  }

  .page-head p {
    margin: 0;
    color: #5c6370;
    line-height: 1.7;
    max-width: 62ch;
  }

  .panel {
    border: 1px solid #e8edf3;
    border-radius: 16px;
    background: #fff;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .panel h2 {
    margin: 0 0 1rem;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  .summary {
    font-size: 1rem;
    line-height: 1.75;
    color: #334155;
    margin: 0 0 1.25rem;
  }

  .stat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.75rem;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #f1f5f9;
  }

  .stat .k {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #7b8794;
  }

  .stat .v {
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  /* nutrient bars: average vs reference */
  .bars {
    display: grid;
    gap: 0.85rem;
  }

  .bar-row {
    display: grid;
    grid-template-columns: 110px 1fr 130px;
    align-items: center;
    gap: 0.9rem;
  }

  .bar-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #334155;
    text-transform: capitalize;
  }

  .bar-track {
    position: relative;
    height: 10px;
    border-radius: 99px;
    background: #eef2f6;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 99px;
    background: var(--primary, #28842b);
    transition: width 0.4s ease;
  }

  .bar-fill.low {
    background: #d29922;
  }

  .bar-fill.high {
    background: var(--secondary, #ff5722);
  }

  .bar-value {
    font-size: 0.8rem;
    color: #64748b;
    text-align: right;
    white-space: nowrap;
  }

  .gaps {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }

  .gap-chip {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.35rem 0.75rem;
    border-radius: 99px;
    border: 1px solid;
    text-transform: capitalize;
  }

  .gap-chip.low {
    background: #fdf6e3;
    color: #9a6700;
    border-color: #f0e0b6;
  }

  .gap-chip.high {
    background: #fff2ed;
    color: #c2410c;
    border-color: #ffd9c9;
  }

  /* recommendation cards */
  .recs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.15rem;
  }

  .rec-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e8edf3;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .rec-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
  }

  .rec-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
    background: var(--lightest, #f4faf4);
  }

  .rec-body {
    padding: 1rem 1.1rem 1.15rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .rec-name {
    margin: 0 0 0.35rem;
    font-size: 1.02rem;
    font-weight: 800;
    color: var(--dark, #143315);
  }

  .rec-meta {
    font-size: 0.78rem;
    color: #7b8794;
    margin-bottom: 0.6rem;
  }

  .rec-reason {
    font-size: 0.88rem;
    line-height: 1.65;
    color: #475569;
    margin: 0 0 0.85rem;
  }

  .rec-addresses {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
  }

  .rec-addresses span {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.22rem 0.55rem;
    border-radius: 99px;
    background: #eaf5ea;
    color: var(--primary, #28842b);
    text-transform: capitalize;
  }

  .rec-macros {
    display: flex;
    gap: 0.9rem;
    font-size: 0.76rem;
    color: #64748b;
    padding-top: 0.75rem;
    border-top: 1px solid #f1f5f9;
    margin-top: auto;
  }

  .rec-macros b {
    color: var(--dark, #143315);
  }

  .rec-link {
    margin-top: 0.85rem;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--primary, #28842b);
    text-decoration: none;
  }

  .rec-link:hover {
    text-decoration: underline;
  }

  /* states */
  .state {
    text-align: center;
    padding: 2.5rem 1.5rem;
  }

  .state h2 {
    margin: 0 0 0.6rem;
    font-size: 1.15rem;
    color: var(--dark, #143315);
  }

  .state p {
    margin: 0 auto 1.25rem;
    max-width: 52ch;
    color: #64748b;
    line-height: 1.7;
  }

  .state a,
  .state button {
    display: inline-block;
    background: var(--primary, #28842b);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
  }

  .notice {
    padding: 1rem 1.25rem;
    border-radius: 10px;
    border-left: 4px solid var(--secondary, #ff5722);
    background: #fff8f5;
    color: #7c2d12;
    font-size: 0.9rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }

  .disclaimer {
    font-size: 0.8rem;
    color: #94a3b8;
    line-height: 1.7;
    text-align: center;
    margin-top: 2rem;
  }

  @media (max-width: 700px) {
    .bar-row {
      grid-template-columns: 84px 1fr;
    }
    .bar-value {
      grid-column: 1 / -1;
      text-align: left;
    }
  }
`;

export default Wrapper;
