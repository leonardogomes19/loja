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

const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

const MySwal = withReactContent(Swal);

const Produtos = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Buscar dados do endpoint '/clientes'
    axios
      .get("http://localhost:3001/getProdutos")
      .then((response) => {
        console.log(response.data);
        // Atualize o estado com os dados retornados
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de /getProdutos:", error);
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
        <h1 className="title">Produtos</h1>
      </div>
      <div className="page-button">
        <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Link href="/produtos/cadastroProduto">Cadastrar</Link>
        </button>
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
                Nome
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Estoque
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Data de cadastro
              </th>
              <th className="px-6 py-3 text-xs font-medium text-grady-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {produtos.length > 0 ? (
              /* Percorre sobre o array 'produtos' para preencher a tabela dinamicamente */
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {produto.nome}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {produto.descricao.length > 25
                      ? produto.descricao.substring(0, 25) + "..."
                      : produto.descricao}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {produto.preco}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {produto.estoque}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {produto.categoria}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {formatarData(produto.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => {
                        // Redirecionar para "/produtos/alterarProduto"
                        router.push(`/produtos/alterarProduto/${produto.id}`);
                        //window.location.href = "/produtos/alterarProduto";
                      }}
                      className="mr-2.5 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        MySwal.fire({
                          title: "Tem certeza que deseja excluir este produto?",
                          text: "Você não poderá reverter esta ação!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sim, excluir!",
                          cancelButtonText: "Cancelar",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            // Chamar a requisição para deletar o produto
                            axios
                              .delete(
                                `http://localhost:3001/deleteProduto/${produto.id}`
                              )
                              .then((response) => {
                                // Atualizar o estado de produtos após a exclusão
                                setProdutos(
                                  produtos.filter((c) => c.id !== produto.id)
                                );
                                MySwal.fire({
                                  title: "Excluído!",
                                  text: "O produto foi excluído com sucesso.",
                                  icon: "success",
                                });
                              })
                              .catch((error) => {
                                console.error(
                                  "Erro ao deletar produto:",
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
                  colSpan="7"
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

export default Produtos;
