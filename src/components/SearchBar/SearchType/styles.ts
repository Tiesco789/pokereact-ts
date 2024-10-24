import styled from 'styled-components';

const SelectType = styled.div`
  margin: 1rem 0;

  select {
    padding: 1rem 0rem 1rem 1rem;
    width: 10%;
    border-radius: 8px;
    appearance: none;
    cursor: pointer;

    &::after {
      content: '▼';
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    option {
      background-color: #fff;
      color: #333;
      padding: 10px;
      border-radius: 8px;

      &:checked {
        background-color: #6374ce;
        color: #fff;
      }
    }
  }
`;

export default SelectType;
