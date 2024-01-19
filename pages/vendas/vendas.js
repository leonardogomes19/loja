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
  const [expandedVendaId, setExpandedVendaId] = useState(null);

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

  // Função para lidar com a expansão da sub-tabela
  const handleDetalhesClick = (vendaId) => {
    console.log("Clicou no botão de detalhes para vendaId:", vendaId);
    // Se o ID da venda clicada já estiver expandido, fecha a expansão
    setExpandedVendaId((prevId) => {
      console.log("Prev ID:", prevId);
      console.log("Novo ID:", prevId === vendaId ? null : vendaId);
      return prevId === vendaId ? null : vendaId;
    });
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
                  Cód. da Venda
                </th>
                <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                  Valor
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
                  Detalhes
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
                  <React.Fragment key={venda.id}>
                    <tr key={venda.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {venda.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {venda.cliente}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {venda.valorVenda}
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
                      <td>
                        {/* Botão de Detalhes */}
                        <button
                          onClick={() => handleDetalhesClick(venda.id)}
                          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <button
                          onClick={() => {
                            // Redirecionar para "/venda/alterarVenda"
                            router.push(`/vendas/alterarVenda/${venda.id}`);
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
                                  vendas.filter((c) => c.id !== venda.id)
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
                    {/* Linha da sub-tabela (detalhes) */}
                    {console.log("venda.produto:", venda.produtos)}
                    {expandedVendaId === venda.id &&
                      venda.produtos &&
                      venda.produtos.length > 0 && (
                        <tr>
                          <td colSpan="10">
                            <table className="w-full bg-gray-200">
                              <thead>
                                {/* Cabeçalho da sub-tabela */}
                                <tr>
                                  <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                                    Produto
                                  </th>
                                  <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                                    Quantidade
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 text-center">
                                {/* Linhas da sub-tabela */}
                                {venda.produtos.map((produto, index) => (
                                  <tr key={index}>
                                    {/* ... Colunas da sub-tabela ... */}
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                      {produto}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                      {venda.quantidades[index]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
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
