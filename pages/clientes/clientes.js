import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dynamic from "next/dynamic";
import { format } from "date-fns"; // Importe a função format do date-fns

const Sidebar = dynamic(() => import("../../components/sidebar.js"), {
  ssr: false,
});

const MySwal = withReactContent(Swal);

const Clientes = () => {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Buscar dados do endpoint '/clientes'
    axios
      .get("http://localhost:3001/getClientes")
      .then((response) => {
        console.log(response.data);
        // Atualize o estado com os dados retornados
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de /getClientes:", error);
      });
  }, []); // Array de dependência vazia para executar o efeito apenas uma vez quando o componente for montado

  // Função para formatar a data
  const formatarData = (data) => {
    return format(new Date(data), "dd/MM/yyyy hh:mm:ss"); // O formato 'dd/MM/yyyy hh:mm:ss' representa o formato brasileiro
  };

  return (
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
        <h1 className="title">Clientes</h1>
      </div>
      <div className="page-button">
        <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Link href="/clientes/cadastroCliente">Cadastrar</Link>
        </button>
      </div>
      <div
        style={{ overflowX: "auto", marginLeft: "20rem", marginRight: "4rem", maxWidth: "100%" }}
        className="mt-4"
      >
        <table
          style={{ marginTop: "1rem" }}
          className="w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Idade
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                CEP
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Cidade
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Número
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Complemento
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Data de Cadastro
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {clientes.length > 0 ? (
              /* Percorre sobre o array 'clientes' para preencher a tabela dinamicamente */
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.idade}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.cpf}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.telefone}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.cep}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.cidade}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.estado}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.endereco}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.numero}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {cliente.complemento}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatarData(cliente.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => {
                        // Redirecionar para "/clientes/alterarCliente"
                        router.push(`/clientes/alterarCliente/${cliente.id}`);
                      }}
                      className="mr-2.5 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        MySwal.fire({
                          title: "Tem certeza que deseja excluir este cliente?",
                          text: "Você não poderá reverter esta ação!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sim, excluir!",
                          cancelButtonText: "Cancelar",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // Chamar a requisição para deletar o cliente
                            axios
                              .delete(
                                `http://localhost:3001/deleteCliente/${cliente.id}`
                              )
                              .then((response) => {
                                // Atualizar o estado de clientes após a exclusão
                                setClientes(
                                  clientes.filter((c) => c.id !== cliente.id)
                                );
                                MySwal.fire({
                                  title: "Excluído!",
                                  text: "O cliente foi excluído com sucesso.",
                                  icon: "success",
                                });
                              })
                              .catch((error) => {
                                console.error(
                                  "Erro ao deletar cliente:",
                                  error
                                );
                              });
                          }
                        });
                      }}
                      className="mr-2.5 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  Nada para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
