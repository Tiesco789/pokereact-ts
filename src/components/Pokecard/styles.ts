import styled from 'styled-components';

const PokeCard = styled.div`
  background-color: #fff;
  width: 215px;
  height: 320px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  box-shadow: 0px 4px 10px rgba(32, 20, 168, 0.02),
    0px 4px 8px rgba(32, 20, 168, 0.02), 0px 4px 4px rgba(32, 20, 168, 0.04);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    border: 2px solid #c0b4ff;
    transform: translate(0, -6px) rotate(3deg);
    box-shadow: 0px 0px 0px 8px rgba(123, 97, 255, 0.1);
  }

  img {
    width: 120px;
    height: 120px;
  }

  h1 {
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    color: #a4a1c6;
  }

  p {
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: center;
    color: #0f0f2e;
  }

  div {
    display: flex;
    gap: 4px;
  }

  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    text-transform: uppercase;
    height: 24px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: #f6f8fc;
  }
`;

export default PokeCard;
