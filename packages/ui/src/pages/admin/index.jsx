import Header from '../../components/globals/Header'
import AdminLayout from '../../screens/admin/admin-layout'

const DashboardClass = `flex items-center justify-between m-5`

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className={DashboardClass}>
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
      </div>
    </AdminLayout>
  )
}

export default Dashboard
