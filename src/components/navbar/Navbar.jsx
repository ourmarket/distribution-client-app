import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar__container">
      <div className="navbar__logo">
        <img src="/images/logo/logo.png" alt="logo" />
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Buscar..." />
      </div>
    </header>
  );
};
