import React, { useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  const [showSenha, setShowSenha] = useState(false);

  useEffect(() => {
    // Verificar se usuário e nível estão no localStorage
    const storedUsuario = localStorage.getItem("usuario");
    const storedNivel = localStorage.getItem("nivel");
  
    if (storedUsuario && storedNivel) {
      // Redirecionar para /dashboard se os dados estiverem no localStorage
      router.push("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação
    axios
      .post("http://localhost:3001/getUsuarioByLogin", formData)
      .then((response) => {
        console.log(response)
        // Extrair dados do response
        const { usuario, nivel } = response.data;
        // Armazenar os dados no localStorage
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("nivel", nivel);
        // Redirecionar para a página após o login bem-sucedido
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de /getUsuario:", error);
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    router.push("/cadastro");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer></ToastContainer>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="usuario"
            >
              Nome de usuário
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Usuário"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="senha"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="senha"
                name="senha"
                type={showSenha ? "text" : "password"}
                placeholder="********"
                value={formData.senha}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleToggleSenha}
              >
                {showSenha ? (
                  <AiOutlineEye className="text-gray-500" />
                ) : (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Entrar
            </button>
          </div>
          <div className="my-2">
            <text className="text-blue-400 cursor-pointer" onClick={handleCadastro}>Não possui cadastro? Cadastre-se aqui</text>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
