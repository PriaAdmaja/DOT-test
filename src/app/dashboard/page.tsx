import AuthFilter from "@/component/auth-filter";

const Dashboard = () => {
  return (
    <>
      <p>dashboard</p>
    </>
  );
};

export default function Page() {
  return (
    <AuthFilter>
      <Dashboard />
    </AuthFilter>
  );
}
