import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { format } from "date-fns"; // Importe a função format do date-fns

import PrivateRoute from "../../../components/privateRoute";

const Sidebar = dynamic(() => import("../../../components/sidebar.js"), {
  ssr: false,
});

export default function EditVendaForm() {
  const router = useRouter();
  const [venda, setVenda] = useState([]);
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nomeVenda: "",
    nomeProduto: "",
    quantidade: "",
    cidade: "",
    estado: "",
    endereco: "",
    status: "",
    created_at: "",
  });

  const [status, setStatus] = useState("");
  const [dataPedido, setDataPedido] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getVenda/${id}`
        );

        if (response.status === 200) {
          setVenda(response.data);
          setFormData(response.data);
          setStatus(response.data.status);
          setDataPedido(formatarData(response.data.created_at));
        } else {
          // Lida com erros de validação ou outros
        }
      } catch (error) {
        console.error(`Erro ao obter dados da venda ${id}:`, error);
        // Adicione um tratamento de erro, como exibição de uma mensagem para o usuário
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, status: value });
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
          `http://localhost:3001/editVenda/${id}`,
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

          // Sucesso - redirecione para a página de vendas
          router.push(`/vendas/vendas`);
          //window.location.href = "/vendas";
        } else {
          // Lida com erros de validação ou outros
        }
      }
    } catch (error) {
      console.error("Erro ao alterar cadastro da venda:", error);
    }
  };

  // Função para formatar a data
  const formatarData = (data, formato) => {
    return format(new Date(data), formato || "dd/MM/yyyy hh:mm:ss");
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
          <h1 className="title">Alterar Venda</h1>
        </div>

        <div className="formularioEditarCadastro">
          <form
            style={{ marginLeft: "20rem", marginRight: "4rem" }}
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="md-4 flex">
              {/* Campo Venda ID */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="id"
                >
                  Cód. da Venda
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Cliente (com tamanho maior) */}
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nomeVenda"
                >
                  Cliente
                </label>
                <input
                  type="text"
                  id="nomeVenda"
                  name="nomeVenda"
                  value={formData.nomeVenda}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Valor */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="valorVenda"
                >
                  Valor
                </label>
                <input
                  type="number"
                  id="valorVenda"
                  name="valorVenda"
                  value={formData.valorVenda}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>

              {/* Campo Cidade */}
              <div className="w-1/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cidade"
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  defaultValue={formData.cidade}
                  onChange={handleChange} // Adiciona um evento de mudança para atualizar o estado
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>

              {/* Campo Estado */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="estado"
                >
                  Estado
                </label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 mx-2 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Endereco */}
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="endereco"
                >
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  defaultValue={formData.endereco}
                  onChange={handleChange} // Adiciona um evento de mudança para atualizar o estado
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Status */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="SOLICITADO">Solicitado</option>
                  <option value="EM ANALISE">Em análise</option>
                  <option value="A CAMINHO">A caminho</option>
                  <option value="CONCLUIDO">Concluído</option>
                </select>
              </div>
              {/* Campo Data do Pedido */}
              <div className="w-1/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="created_at"
                >
                  Data do Pedido
                </label>
                <div className="w-full">
                  <span>{dataPedido}</span>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push(`/vendas/vendas`)}
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
