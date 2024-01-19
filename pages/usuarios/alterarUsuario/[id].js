import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

import PrivateRoute from "../../../components/privateRoute";

const Sidebar = dynamic(() => import("../../../components/sidebar.js"), {
  ssr: false,
});

export default function EditUsuarioForm() {
  const router = useRouter();
  const [usuario, setUsuario] = useState([]);
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nivel: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getUsuario/${id}`
        );

        if (response.status === 200) {
          setUsuario(response.data);
          setFormData(response.data);
        } else {
          // Lida com erros de validação ou outros
        }
      } catch (error) {
        console.error(`Erro ao obter dados do usuário ${id}:`, error);
        // Adicione um tratamento de erro, como exibição de uma mensagem para o usuário
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; */

  const handleNivelChange = (e) => {
    const nivelValue = e.target.value;
    setFormData({ ...formData, nivel: nivelValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const campoVazio = Object.values(formData).some((valor) => valor === "");

      if (campoVazio) {
        toast.error("Preencha os campos corretamente!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const response = await axios.put(
          `http://localhost:3001/editUsuario/${id}`,
          formData
        );

        if (response.status === 200) {
          toast.success("Alteração realizada com sucesso!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          // Aguarda um período antes de redirecionar
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Sucesso - redirecione para a página de clientes
          router.push(`/usuarios`);
          //window.location.href = "/produtos";
        } else {
          // Lida com erros de validação ou outros
        }
      }
    } catch (error) {
      console.error("Erro ao alterar cadastro do usuário:", error);
    }
  };

  return (
    <PrivateRoute>
          <div>
      <ToastContainer></ToastContainer>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
        rel="stylesheet"
      ></link>
      <div className="sidebar-container">
        <Sidebar></Sidebar>
      </div>

      <div className="page-title">
        <h1 className="title">Alterar Cadastro</h1>
      </div>

      <div className="formularioEditarCadastro">
        <form
          style={{ marginLeft: "20rem", marginRight: "4rem" }}
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 flex">
            {/* Campo Nível */}
            <div className="w-1/4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nivel"
              >
                Nível
              </label>
              <select
                id="nivelSelect"
                name="nivel"
                value={formData.nivel}
                onChange={handleNivelChange}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" selected disabled>
                  Escolha uma opção
                </option>
                <option value="operador">Operador</option>
                <option value="administrador">Administrador</option>
                <option value="gerencia">Gerencia</option>
              </select>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push(`/usuarios/usuarios`)}
              className="bg-red-500 hover:bg-red-700 text-white float-left font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
    </PrivateRoute>

  );
}
