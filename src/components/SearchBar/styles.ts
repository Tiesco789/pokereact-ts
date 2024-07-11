import styled from 'styled-components';

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;

  form {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .pokeSearch {
      padding: 12px 16px ;
      border-radius: 8px 0 0 8px;
      width: 100%;
      transition: .2s;
      font-size: 1.125rem;
      &:focus {
        box-shadow:
        0px 0px 0px 6px #E4E1F8,
        inset 0px 0px 0px 1px #c0b4ff;
      }
    }

    .pokeFilter {
      margin-left: 24px;
      background-color: rgb(155, 105, 217);
      color: #FFF;
      font-weight: bold;
      padding: 0 16px;
      border-radius: 8px;
      font-size: 1.125rem;
      cursor: pointer;
      transition: .2s;

      &:hover {
        background-color: rgb(165, 115, 227);
      }
    }

    button {
      background-color: rgb(155, 105, 217);
      color: #FFF;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      transition: background-color .2s;
      font-weight: 600;
      font-size: 1.125rem;

      &:hover {
        background-color: rgb(165, 115, 227);
      }
    }
  }


`;
export default Searchbar;
