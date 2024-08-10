"use client";

import Chart from "react-apexcharts";

type CategorySales = {
  categoryId: string;
  categoryName: string;
  totalSales: number;
  productsSold: number;
};

interface ChartDonutProps {
  sales: CategorySales[];
}

const ChartDonut = ({ sales }: ChartDonutProps) => {
  const configs = {
    options: {
      labels: sales.map(
        (item) => `${item.categoryName} (R$ ${item.totalSales})`,
      ),
      legend: {
        position: "bottom" as "bottom", // Assegura que o valor é do tipo correto
      },
    },
    series: sales.map((item) => item.productsSold),
  };

  if (!sales) return <div>Carregando dados...</div>;

  return (
    <div className="h-[350px] w-full md:h-[390px]">
      <Chart
        options={configs.options}
        series={configs.series}
        type="pie"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default ChartDonut;
