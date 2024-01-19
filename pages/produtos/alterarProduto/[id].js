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

export default function EditProdutoForm() {
  const router = useRouter();
  const [produto, setProduto] = useState([]);
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    categoria_id: "",
    imagem: null, // Adiciona o campo de imagem
  });

  const [categorias, setCategorias] = useState([]); // Adiciona um estado para armazenar as categorias

  useEffect(() => {
    const buscaCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getCategorias");
        setCategorias(response.data); // Armazena as categorias no estado
      } catch (error) {
        console.error("Erro ao obter categorias:", error);
      }
    };

    buscaCategorias();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getProduto/${id}`
        );

        if (response.status === 200) {
          setProduto(response.data);
          setFormData(response.data);
        } else {
          // Lida com erros de validação ou outros
        }
      } catch (error) {
        console.error(`Erro ao obter dados do produto ${id}:`, error);
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

  const handleCategoriaChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, categoria_id: parseInt(value, 10) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const path = `/assets/${file.name}`;
    setFormData({ ...formData, imagem: path });
    console.log(formData); // Adicione este console.log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adiciona categoria_id apenas no submit
    const categoriaSelect = document.getElementById("categoriaSelect");
    const categoria_id = categoriaSelect.value;
    setFormData({ ...formData, categoria_id });

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
          `http://localhost:3001/editProduto/${id}`,
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
          router.push(`/produtos/produtos`);
          //window.location.href = "/produtos";
        } else {
          // Lida com erros de validação ou outros
        }
      }
    } catch (error) {
      console.error("Erro ao alterar cadastro do produto:", error);
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
              {/* Campo Nome (com tamanho maior) */}
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nome"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Descrição */}
              <div className="w-1/2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descricao"
                >
                  Descrição
                </label>
                <textarea
                  type="text"
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div className="mb-4 flex">
              {/* Campo Preço */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="preco"
                >
                  Preço
                </label>
                <input
                  type="number"
                  step=".01"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Campo Estoque */}
              <div className="w-1/6 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="estoque"
                >
                  Estoque
                </label>
                <input
                  type="number"
                  id="estoque"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Campo Categoria */}
              <div className="w-1/6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Categoria
                </label>
                <select
                  id="categoriaSelect"
                  defaultValue={formData.categoria_id}
                  onChange={handleCategoriaChange} // Adiciona um evento de mudança para atualizar o estado
                  className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Escolha uma opção</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campo Imagem */}
            <div className="mb-4 flex">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="imagem"
                >
                  Imagem
                </label>
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  onChange={(e) => handleImageChange(e)}
                  className="w-full"
                />
                {formData.imagem && (
                  <p className="mt-2 text-gray-600">{formData.imagem}</p>
                )}
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.push(`/produtos/produtos`)}
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
