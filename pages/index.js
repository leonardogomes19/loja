import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const Sidebar = dynamic(() => import('../components/sidebar.js'), { ssr: false });

const Dashboard = () => {
    // Dados de exemplo para os cards
    const totalClientes = 2000;
    const totalProdutos = 1000;
    const totalAvaliacoes = 200;

    // Dados de exemplo para o gráfico de produtos mais vendidos
    const produtosMaisVendidos = {
        options: {
            chart: {
                type: 'bar',
                background: 'transparent',
                height: 350,
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
                title: {
                    style: {
                        color: '#f5f7ff',
                    },
                },
                axisBorder: {
                    show: true,
                    color: '#55596e',
                },
                axisTicks: {
                    show: true,
                    color: '#55596e',
                },
                labels: {
                    style: {
                        colors: '#f5f7ff',
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'Vendas por produto',
                    style: {
                        color: '#f5f7ff',
                    },
                },
                axisBorder: {
                    color: '#55596e',
                    show: true,
                },
                axisTicks: {
                    color: '#55596e',
                    show: true,
                },
                labels: {
                    style: {
                        colors: '#f5f7ff',
                    },
                },
            },
            colors: ['#2962ff', '#d50000', '#2e7d32', '#ff6d00', '#583cb3'],
            plotOptions: {
                bar: {
                    distributed: true,
                    borderRadius: 4,
                    horizontal: false,
                    columnWidth: '40%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 1,
            },
            grid: {
                borderColor: '#55596e',
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            legend: {
                labels: {
                    colors: '#f5f7ff',
                },
                show: true,
                position: 'top',
            },
            markers: {
                size: 6,
                strokeColors: '#1b2635',
                strokeWidth: 3,
            },
            stroke: {
                colors: ['transparent'],
                show: true,
                width: 2,
            },
            tooltip: {
                shared: true,
                intersect: false,
                theme: 'dark',
            },
        },
        series: [
            {
                name: 'Vendas',
                data: [300, 450, 600, 200, 700],
            },
        ],
    };

    // Dados de exemplo para o gráfico de total de produtos vendidos de janeiro a dezembro
    const totalProdutosVendidos = {
        series: [
            {
                name: 'Vendas',
                data: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
            },
            {
                name: 'Cancelamentos',
                data: [20, 25, 17, 30, 10, 9, 23, 20, 10, 7, 5, 3],
            },
        ],
        chart: {
            type: 'area',
            background: 'transparent',
            height: 350,
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        options: {
            chart: {
                type: 'area',
                background: 'transparent',
                height: 350,
                stacked: false,
                toolbar: {
                    show: false,
                },
            },
            colors: ['#00ab57', '#d50000'],
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Out', 'Nov', 'Dez'],
            dataLabels: {
                enabled: false,
            },
            fill: {
                gradient: {
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    shadeIntensity: 1,
                    stops: [0, 100],
                    type: 'vertical',
                },
                type: 'gradient',
            },
            grid: {
                borderColor: '#55596e',
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            legend: {
                labels: {
                    colors: '#f5f7ff',
                },
                show: true,
                position: 'top',
            },
            markers: {
                size: 6,
                strokeColors: '#1b2635',
                strokeWidth: 3,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: '#55596e',
                    show: true,
                },
                axisTicks: {
                    color: '#55596e',
                    show: true,
                },
                labels: {
                    offsetY: 5,
                    style: {
                        colors: '#f5f7ff',
                    },
                },
            },
            yaxis: [
                {
                    title: {
                        text: 'Vendas',
                        style: {
                            color: '#f5f7ff',
                        },
                    },
                    labels: {
                        style: {
                            colors: ['#f5f7ff'],
                        },
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: 'Cancelamentos',
                        style: {
                            color: '#f5f7ff',
                        },
                    },
                    labels: {
                        style: {
                            colors: ['#f5f7ff'],
                        },
                    },
                },
            ],
            tooltip: {
                shared: true,
                intersect: false,
                theme: 'dark',
            },
        },

    };

    return (

        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet"></link>
      <div className="sidebar-container">
        <Sidebar></Sidebar>
      </div>

            <main className="main-container">
                <div className="main-title">
                    <h2>DASHBOARD</h2>
                </div>
                <div className="main-cards">
                    <div className="card">
                        <div className="card-inner">
                            <h3>CLIENTES</h3>
                            <span className="material-icons-outlined">groups</span>
                        </div>
                        <h1>{totalClientes}</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>PRODUTOS</h3>
                            <span className="material-icons-outlined">inventory_2</span>
                        </div>
                        <h1>{totalProdutos}</h1>
                    </div>
                    <div className="card">
                        <div className="card-inner">
                            <h3>AVALIAÇÕES</h3>
                            <span className="material-icons-outlined">poll</span>
                        </div>
                        <h1>{totalAvaliacoes}</h1>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts-card">
                        <h2 className="chart-title">Produtos Mais Vendidos</h2>
                        <Chart options={produtosMaisVendidos.options} series={produtosMaisVendidos.series} type="bar" height={300} width="100%" />
                    </div>
                    <div className="charts-card">
                        <h2 className="chart-title">Total de Produtos Vendidos</h2>
                        <Chart options={totalProdutosVendidos.options} series={totalProdutosVendidos.series} type="area" height={300} width="100%" />
                    </div>
                </div>
            </main>
        </div>

    );
};

export default Dashboard;