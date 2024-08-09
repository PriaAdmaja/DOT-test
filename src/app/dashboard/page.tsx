import AuthFilter from "@/component/auth-filter";
import Layout from "@/component/layout";

const Dashboard = () => {
  return (
    <Layout>
      <p>dashboard</p>
    </Layout>
  );
};

export default function Page() {
  return (
    <AuthFilter>
      <Dashboard />
    </AuthFilter>
  );
}
