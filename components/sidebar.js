import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  // Recupera o nome do usuário do localStorage
  const userName = localStorage.getItem("usuario");

  const handleClick = (e) => {
    localStorage.removeItem("usuario")
    localStorage.removeItem("nivel")
    router.push("/");

  }

  useEffect(() => {
    const userElement = document.getElementById("userName");
    if (userElement) {
      const text = userName || "";
      let index = 0;

      const typeWriter = () => {
        if (index < text.length) {
          userElement.innerHTML += text.charAt(index);
          index++;
          setTimeout(typeWriter, 50);
        }
      };

      typeWriter();
    }
  }, [userName]);

  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <span className="material-icons-outlined">shopping_cart</span> STORE
          </div>
          <span
            className="material-icons-outlined" /* onClick="closeSidebar()" */
          >
            close
          </span>
        </div>
        <div className="user-info">
          <span className="user-name typewriter">Olá, {userName}!</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">dashboard</span>
            </div>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">category</span>
            </div>
            <Link href="/categorias/categorias">Categorias</Link>
          </li>
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">inventory_2</span>
            </div>
            <Link href="/produtos/produtos">Produtos</Link>
          </li>
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">groups</span>
            </div>
            <Link href="/clientes/clientes">Clientes</Link>
          </li>
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-symbols-outlined">contract</span>
            </div>
            <Link href="/vendas/vendas">Vendas</Link>
          </li>
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">person</span>
            </div>
            <Link href="/usuarios/usuarios">Usuários</Link>
          </li>
          {/*           <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">settings</span>
            </div>
            <Link href="/configuracoes">Configurações</Link>
          </li> */}
        </ul>
        <div className="logout">
          <div id="icon-item" onClick={handleClick}>
            <span className="material-symbols-outlined">logout</span>
            <span className="logout-name">Sair</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
