import Logo from "../assets/logo.svg";

type Props = {};

export default function Header({}: Props) {
  return (
    <header>
      <nav>
        <img src={Logo} alt="logo SportSee" />
        <a href="#" className="nav-list-item">
          Accueil
        </a>
        <a href="#" className="nav-list-item">
          Profil
        </a>
        <a href="#" className="nav-list-item">
          Réglage
        </a>
        <a href="#" className="nav-list-item">
          Communauté
        </a>
      </nav>
    </header>
  );
}
