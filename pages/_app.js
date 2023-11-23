import 'tailwindcss/tailwind.css';
import '../styles.css'; // Importe seus estilos globais
import '../components/css/sidebar.css'
import { Fragment } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Fragment>
      {/* Coloque qualquer conteúdo global aqui que deseja que apareça em todas as páginas */}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;