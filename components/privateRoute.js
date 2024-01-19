import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  // Verifique a autenticação no lado do cliente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('usuario');
    if (!isAuthenticated) {
      // Redirecione para a página de login se não estiver autenticado
      router.replace('/'); // Substitua pelo caminho da sua página de login
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;