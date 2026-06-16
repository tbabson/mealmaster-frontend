import styled from 'styled-components';

const Wrapper = styled.div`
  .currentUser {
    background: var(--darkest);
    width: 100%;
    margin: 0 auto;
  }

  .currentUserContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 90%;
    margin: 0 auto;
    padding: 1rem 2rem;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .user-name {
    color: var(--light);
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .logAndCart {
    display: flex;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
  }

  .login-btn,
  .logout-btn {
    background: var(--transparent);
    color: var(--light);
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
    transition: background 0.3s, color 0.3s;
    white-space: nowrap;
  }

  .login-btn:hover,
  .logout-btn:hover {
    background: var(--transparent);
    color: var(--dark);
  }

  .indicator {
    position: relative;
    cursor: pointer;
    color: var(--light);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    width: 2.6rem;
    height: 2.6rem;
    transition: background 0.25s ease, transform 0.2s ease;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
    color: var(--secondary);
  }

  .indicator span {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--secondary);
    color: var(--darkest);
    border-radius: 50%;
    font-size: 0.65rem;
    min-width: 1.2rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border: 2px solid var(--darkest);
    line-height: 1;
  }
`;

export default Wrapper;
