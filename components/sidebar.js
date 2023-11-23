import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <span className="material-icons-outlined">shopping_cart</span> STORE
          </div>
          <span className="material-icons-outlined" /* onClick="closeSidebar()" */>close</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <div id="icon-item">
              <span className="material-icons-outlined">dashboard</span>
            </div>
            <Link href="/">Dashboard</Link>
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
      </aside>
    </div>
  );
};

export default Sidebar;