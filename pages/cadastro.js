import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cadastro = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
    confSenha: "",
    nivel: "Operacional",
  });

  const [senhaError, setSenhaError] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfSenha, setShowConfSenha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNivelChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, nivel: parseInt(value, 10) });
  };

  const validarSenhas = () => {
    if (formData.senha !== formData.confSenha) {
      setSenhaError(true);
      return false;
    }
    setSenhaError(false);
    return true;
  };

  const handleConfSenhaChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Verificar senhas ao mudar a confirmação de senha
    const senhasConferem = formData.senha === value;
    setSenhaError(!senhasConferem);
  };

  const handleToggleSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleToggleConfSenha = () => {
    setShowConfSenha(!showConfSenha);
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!validarSenhas()) {
      toast.error("As senhas não coincidem!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // Ajustar o objeto formData antes de enviar
    const dadosCadastro = {
      usuario: formData.usuario,
      senha: formData.senha,
      nivel: formData.nivel,
    };

    // Lógica de autenticação
    axios
      .post("http://localhost:3001/usuarios", dadosCadastro)
      .then((response) => {
        console.log(response);
        // Extrair dados do response
        const { usuario, nivel } = response.data;
        // Armazenar os dados no localStorage
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("nivel", nivel);
        // Redirecionar para a página após o cadastro bem-sucedido
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário em /usuarios:", error);
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

  return (
    <div className="flex h-screen items-center justify-center">
      <ToastContainer></ToastContainer>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Cadastro</h2>
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="senha"
            >
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  senhaError ? "border-red-500" : ""
                }`}
                id="confSenha"
                name="confSenha"
                type={showConfSenha ? "text" : "password"}
                placeholder="********"
                value={formData.confSenha}
                onChange={handleConfSenhaChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleToggleConfSenha}
              >
                {showConfSenha ? (
                  <AiOutlineEye className="text-gray-500" />
                ) : (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                )}
              </div>
            </div>
            {senhaError && (
              <p className="text-red-500 text-xs italic">
                As senhas não condizem!
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nivel"
            >
              Nível
            </label>
            <select
              id="nivelSelect"
              defaultValue={formData.nivel}
              onChange={handleNivelChange}
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Operacional">Operacional</option>
              <option value="Administrador">Administrador</option>
              <option value="Gerência">Gerência</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCadastro}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;