import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { format } from "date-fns"; // Importe a função format do date-fns

import PrivateRoute from "../../components/privateRoute";

const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

const Vendas = () => {
  const router = useRouter();
  const [vendas, setVendas] = useState([]);

  useEffect(() => {

    // Buscar dados do endpoint '/vendas'
    axios
      .get("http://localhost:3001/getVendas")
      .then((response) => {
        console.log(response.data);
        // Atualize o estado com os dados retornados
        setVendas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de /getVendas:", error);
      });
  }, []); // Array de dependência vazia para executar o efeito apenas uma vez quando o componente for montado

  // Função para formatar a data
  const formatarData = (data) => {
    return format(new Date(data), "dd/MM/yyyy hh:mm:ss"); // O formato 'dd/MM/yyyy hh:mm:ss' representa o formato brasileiro
  };

  return (
    <PrivateRoute>
          <div>
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
        <h1 className="title">Vendas</h1>
      </div>
      <div
        style={{ marginLeft: "20rem", marginRight: "4rem" }}
        className="mt-4"
      >
        <table
          style={{ marginTop: "1rem" }}
          className="w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Qtd
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
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Data do pedido
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {vendas.length > 0 ? (
              /* Percorre sobre o array 'vendas' para preencher a tabela dinamicamente */
              vendas.map((venda) => (
                <tr key={venda.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.cliente}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.produto}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.quantidade}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.cidade}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.estado}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.endereco}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {venda.status}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatarData(venda.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => {
                        // Redirecionar para "/venda/alterarVenda"
                        router.push(`/venda/alterarVenda/${venda.id}`);
                        //window.location.href = "/venda/alterarVenda";
                      }}
                      className="mr-2.5 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        // Chamar a requisição para deletar a venda
                        axios
                          .delete(
                            `http://localhost:3001/deleteVenda/${venda.id}`
                          )
                          .then((response) => {
                            // Atualizar o estado de vendas após a exclusão
                            setVendas(
                              vendas.filter((c) => c.id !== produto.id)
                            );
                          })
                          .catch((error) => {
                            console.error("Erro ao deletar venda:", error);
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
                  colSpan="9"
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
    </PrivateRoute>

  );
};

export default Vendas;
