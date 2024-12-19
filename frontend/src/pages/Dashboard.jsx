import Analytics from "../components/Analytics";
import Transactions from "../components/Transactions";
import StatsPieChart from "../components/StatsPieChart";
import MonthlyAndYearlyPayments from "../components/MonthlyAndYearlyPayments";

const Dashboard = () => {
  return (
    <main className="p-4 sm:p-6 h-[89vh] overflow-y-scroll">
      <section className="mb-6">
        <Analytics />
      </section>
      <section className="flex justify-between">
        <Transactions />
        &nbsp;
        <StatsPieChart />
      </section>
      {/* <section className="mt-6">
        <MonthlyAndYearlyPayments />
      </section> */}
    </main>
  );
};

export default Dashboard;
