import Header from "../components/shared/header/Header"

const AccountCreate = ({children}) => {
  return (
    <div>
            <Header />
            <main className="min-h-screen">{children}</main>
        </div>
  )
}

export default AccountCreate