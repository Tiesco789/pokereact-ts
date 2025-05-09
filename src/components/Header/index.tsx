import HeaderStyled from './styles';
import { Button } from 'primereact/button';

const Header = () => {
  return (
    <>
      <HeaderStyled>
        <nav>
          <div>
            <img src="Loog" alt="" />
          </div>
          <ul>
            <li><a className="main-link"  href="">Home</a></li>
            <li><a className="main-link"  href="">Sobre</a></li>
            <li><a className="main-link"  href="https://github.com/Tiesco789">Github</a></li>
            <li>
              <a href="https://www.buymeacoffee.com/tiesco" target="_blank">
                <img
                  src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                  alt="Buy Me A Coffee"
                />
              </a>
            </li>
          </ul>
        </nav>
      </HeaderStyled>
    </>
  )
}

export default Header;
