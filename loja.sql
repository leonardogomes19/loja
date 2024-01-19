-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Jan-2024 às 08:25
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `loja`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`, `descricao`, `created_at`, `updated_at`) VALUES
(2, 'Smartphones', 'Celulares Android, iOS', '2023-12-04 18:55:30', '2023-12-04 22:11:57'),
(3, 'Smart TVs', 'Televisão', '2023-12-04 23:52:45', '2023-12-04 23:52:45'),
(4, 'Fones de Ouvido', 'Bluetooth, Wireless, com fio, com microfone.', '2023-12-04 23:55:34', '2023-12-04 23:55:34'),
(5, 'Laptops', 'Notebooks', '2023-12-04 23:58:49', '2023-12-04 23:58:49'),
(6, 'Câmeras', 'Fotográfica, Vigilância', '2023-12-04 23:59:52', '2023-12-04 23:59:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `idade` tinyint(4) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `complemento` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `idade`, `cpf`, `telefone`, `cep`, `bairro`, `cidade`, `estado`, `endereco`, `numero`, `complemento`, `created_at`, `updated_at`) VALUES
(1, 'Leonardo', 22, '22222222222', '12999999999', '10000000', 'Teste', 'Teste', 'Teste', 'Teste', '100', 'Casa', '2024-01-19 03:57:07', '2024-01-19 03:57:07');

-- --------------------------------------------------------

--
-- Estrutura da tabela `items_venda`
--

CREATE TABLE `items_venda` (
  `id` int(11) NOT NULL,
  `venda_id` int(11) NOT NULL,
  `produto_id` int(11) NOT NULL,
  `quantidade` int(10) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `items_venda`
--

INSERT INTO `items_venda` (`id`, `venda_id`, `produto_id`, `quantidade`, `valor`, `created_at`, `updated_at`) VALUES
(3, 1, 7, 1, '177.90', '2023-12-08 07:57:27', '2023-12-08 07:57:27'),
(4, 1, 6, 1, '237.79', '2023-12-08 07:57:27', '2023-12-08 07:57:27'),
(5, 2, 8, 1, '1079.99', '2023-12-12 02:12:13', '2023-12-12 02:12:13');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `caminho_img` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `estoque`, `categoria_id`, `caminho_img`, `created_at`, `updated_at`) VALUES
(3, 'Apple iPhone 15 (128 GB) — Preto', 'Super Retina XDR display, 6.1‑inch (diagonal) all‑screen OLED display, 2556x1179-pixel resolution at 460 ppi', '7299.00', 10, 2, 'iphone-15.jpg', '2023-12-04 19:01:31', '2023-12-05 04:12:17'),
(4, 'Apple iPhone SE (64 GB) Preto', 'Tela Retina HD de 4,7 polegadas com True Tone', '3994.92', 10, 2, 'iphone-se.jpg', '2023-12-04 20:27:41', '2023-12-05 04:12:20'),
(5, 'Câmera Digital Canon EOS M200 15-45', 'Gravação de vídeos em 4K 24p com função Time-Lapse e Full HD 60p.', '3799.00', 5, 6, 'camera-digital-canon-eos-m200-15-45.jpg', '2023-12-05 00:30:03', '2023-12-05 04:12:23'),
(6, 'JBL Fone de Ouvido On ear Tune 520BT - Preto', 'TECNOLOGIA BLUETOOTH. O JBL Tune 520BT apresenta o renomado som JBL Pure Bass, o mesmo que toca nos locais mais famosos em todo o mundo.', '237.79', 3, 4, 'jbl-fone-de-ouvido-520bt.jpg', '2023-12-05 00:39:01', '2024-01-19 07:02:12'),
(7, 'PHILIPS Fone de ouvido sem fio TWS bluetooth com m', 'Controle sensível ao toque responsivo e fácil de usar', '177.90', 10, 4, 'philips-fone-de-ouvido-sem-fio-tws-bluetooth.jpg', '2023-12-05 00:40:29', '2023-12-05 04:12:31'),
(8, 'Samsung LH32BETBLGGXZD - Smart TV LED 32\'\' HD', 'Sistema operacional Tizen: A melhor plataforma SmartTV. Acesse aplicativos como Netflix e Amazon Prime Video, além de músicas, notícias, jogos e redes sociais.', '1079.99', 50, 3, 'samsung-smart-tv-hd.jpg', '2023-12-05 00:42:04', '2023-12-05 04:12:34'),
(9, 'Notebook ASUS E410MA, Celeron Dual Core 4GB 128G', 'Compacto, fino e leve 1,3 kg / Bateria de longa duração / Tela NanoEdge com bordas ultrafinas / Touchpad de 4,7” com suporte NumberPad', '1699.00', 20, 5, 'Notebook-ASUS-E410MA.jpg', '2023-12-05 00:48:27', '2024-01-19 07:02:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nivel` varchar(15) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `senha`, `nivel`, `created_at`, `updated_at`) VALUES
(1, 'Teste', '$2b$10$bl0qTamoNfBeXZg/LqTt1uEP/P1dy/qkcsqfDcfNhDbCxUtvnQWl.', 'Operacional', '2024-01-19 02:28:38', '2024-01-19 02:28:38');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_app`
--

CREATE TABLE `usuarios_app` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuarios_app`
--

INSERT INTO `usuarios_app` (`id`, `usuario`, `senha`, `created_at`, `updated_at`) VALUES
(1, 'leogr2023@gmail.com', '$2y$10$3qQCosY/iLovgXhz4jvtje1FLCiQjx4hqE3mlzISlKtZpWQDdg15i', '2023-12-08 01:07:17', '2023-12-08 02:22:10');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `valorVenda` decimal(10,2) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` char(2) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `recebedor` varchar(255) NOT NULL,
  `recebedor_cpf` varchar(11) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Aguardando pagamento',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `vendas`
--

INSERT INTO `vendas` (`id`, `cliente_id`, `valorVenda`, `cidade`, `estado`, `endereco`, `numero`, `complemento`, `recebedor`, `recebedor_cpf`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '415.69', 'Taubaté', 'SP', 'Rua Teste', 100, 'Casa', 'Leonardo', '22222222222', 'EM ANALISE', '2023-12-08 07:57:27', '2024-01-19 05:16:28'),
(2, 1, '1079.99', 'Taubaté', 'SP', 'Rua Teste', 100, 'Casa', 'Leonardo', '22222222222', 'SOLICITADO', '2023-12-12 02:12:13', '2024-01-19 03:57:49');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `items_venda`
--
ALTER TABLE `items_venda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_itemsVenda_vendas` (`venda_id`) USING BTREE,
  ADD KEY `FK_itemsVenda_produtos` (`produto_id`) USING BTREE;

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_produtos_categorias` (`categoria_id`) USING BTREE;

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios_app`
--
ALTER TABLE `usuarios_app`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_vendas_clientes` (`cliente_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `items_venda`
--
ALTER TABLE `items_venda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuarios_app`
--
ALTER TABLE `usuarios_app`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
