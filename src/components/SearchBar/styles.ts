import styled from 'styled-components';

const Searchbar = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background-color: #f0f3f4;

    input {
      padding: 16px 20px ;
      width: 100;
      border-radius: 8px 0 0 8px;
      width: 1120px;
    }

    button {
      background-color: rgb(155, 105, 217);
      color: #FFF;
      padding: 16px 20px ;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      transition: background-color .2s;


      &:hover {
        background-color: rgb(165, 115, 227);
      }
    }
  }


`;
export default Searchbar;
