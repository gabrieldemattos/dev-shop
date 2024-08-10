"use client";

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getSalesForLast6Months } from "../../_actions/get-sales-for-last-6-months";

interface Sales {
  month: string;
  year: number;
  salesCount: number;
}

const ChartBar = () => {
  const [sales, setSales] = useState<Sales[] | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      const sales = await getSalesForLast6Months();

      setSales(sales);
    };

    fetchSales();
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: sales?.map((item) => item.month.toUpperCase()),
    },
    yaxis: {
      title: {
        text: "Total de pedidos",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["black"],
      },
    },
  };

  const series = [
    {
      name: "Vendas",
      data: sales ? sales?.map((item) => item.salesCount) : [0, 0, 0, 0, 0, 0],
    },
  ];

  if (!sales) return <div>Carregando dados...</div>;

  return (
    <div className="margin-auto w-full max-w-[800px]">
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
};

export default ChartBar;
