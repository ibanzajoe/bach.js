import Header from "../../../components/globals/Header";

const DashboardClass = `flex items-center justify-between m-5`;

const Dashboard = () => {
    return (
        <div className={DashboardClass}>
            <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
        </div>
    );
};

export default Dashboard;
