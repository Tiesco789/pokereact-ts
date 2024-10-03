import styled from 'styled-components';

const HeaderStyled = styled.nav`
  nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 4rem 0 1rem;

    ul {
      display: flex;
      align-items: center;

      li {
        justify-content: space-between;
        margin-right: 1rem;

        .main-link {
          text-decoration: none;
          background-color: rgb(155, 105, 217);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;

          &:hover {
            background-color: rgb(165, 115, 227);
          }
        }
      }
    }
  }
`;

export default HeaderStyled;
