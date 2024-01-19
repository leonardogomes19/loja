import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dynamic from "next/dynamic";

import PrivateRoute from "../../components/privateRoute.js";

const Sidebar = dynamic(() => import("../../components/sidebar.js"), {
  ssr: false,
});

const MySwal = withReactContent(Swal);

const categorias = () => {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Buscar dados do endpoint '/clientes'
    axios
      .get("http://localhost:3001/getCategorias")
      .then((response) => {
        console.log(response.data);
        // Atualize o estado com os dados retornados
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de /getCategorias:", error);
      });
  }, []); // Array de dependência vazia para executar o efeito apenas uma vez quando o componente for montado

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
        <h1 className="title">Categorias</h1>
      </div>
      <div className="page-button">
        <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Link href="/categorias/cadastroCategoria">Cadastrar</Link>
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
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-center">
            {categorias.length > 0 ? (
              /* Percorre sobre o array 'categorias' para preencher a tabela dinamicamente */
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {categoria.nome}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {categoria.descricao}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <button
                      onClick={() => {
                        // Redirecionar para "/categorias/alterarCategoria"
                        router.push(
                          `/categorias/alterarCategoria/${categoria.id}`
                        );
                        //window.location.href = "/categorias/alterarCategoria";
                      }}
                      className="mr-2.5 py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        MySwal.fire({
                          title:
                            "Tem certeza que deseja excluir esta categoria?",
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
                                `http://localhost:3001/deleteCategoria/${categoria.id}`
                              )
                              .then((response) => {
                                // Atualizar o estado de categorias após a exclusão
                                setCategorias(
                                  categorias.filter(
                                    (c) => c.id !== categoria.id
                                  )
                                );
                                MySwal.fire({
                                  title: "Excluído!",
                                  text: "A categoria foi excluída com sucesso.",
                                  icon: "success",
                                });
                              })
                              .catch((error) => {
                                console.error(
                                  "Erro ao deletar categoria:",
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
                  colSpan="4"
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

export default categorias;
