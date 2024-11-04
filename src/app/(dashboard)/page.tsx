import DataCharts from "@/components/DataCharts";
import DataGrid from "@/components/DataGrid";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-5 px-5 lg:px-10 lg:pb-10">
      <DataGrid></DataGrid>
      <DataCharts></DataCharts>
    </div>
  );
}
