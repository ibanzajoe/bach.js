import Header from '@/components/globals/Header';

const Users = () => {
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "company",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
        },
        {
            field: "createdAt",
            headerName: "Created",
        },
        {
            field: "action",
            headerName: "Action",
        }
    ]

    return (
        <div className="m-5">
            <Header title="USERS" subtitle="Your User List" />
            <div className="mt-4 h-screen-75">
                {/* add data grid here */}
            </div>
        </div>
    )
}

export default Users;
