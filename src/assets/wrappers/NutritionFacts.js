import styled from "styled-components";

const Wrapper = styled.section`
  border: 1px solid var(--border);
  border-radius: 16px;
  background: #fff;
  padding: 1.5rem;

  .nf-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .nf-title {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--dark, var(--text-primary));
  }

  .nf-title svg {
    color: var(--primary, var(--primary));
  }

  .nf-serving {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
  }

  .nf-calories {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.9rem 1.1rem;
    border-radius: 12px;
    background: var(--lightest, var(--surface-soft));
    border: 1px solid #e2ede2;
    margin-bottom: 1.1rem;
  }

  .nf-calories .val {
    font-size: 1.9rem;
    font-weight: 800;
    color: var(--dark, var(--text-primary));
    line-height: 1;
  }

  .nf-calories .unit {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--primary, var(--primary));
  }

  .nf-calories .lbl {
    margin-left: auto;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .nf-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 0.65rem;
  }

  .nf-cell {
    padding: 0.75rem 0.85rem;
    border-radius: 10px;
    border: 1px solid #eef2f6;
    background: #fbfcfd;
  }

  .nf-cell .k {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }

  .nf-cell .v {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--dark, var(--text-primary));
  }

  .nf-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 1.1rem;
  }

  .nf-chip {
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.32rem 0.7rem;
    border-radius: 99px;
    background: #eaf5ea;
    color: var(--primary, var(--primary));
    border: 1px solid #d3e9d4;
  }

  .nf-note {
    margin: 1rem 0 0;
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .nf-note.caveat {
    padding-left: 0.75rem;
    border-left: 3px solid var(--secondary, var(--secondary));
  }

  .nf-empty {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  @media (max-width: 600px) {
    padding: 1.15rem;
    .nf-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default Wrapper;
