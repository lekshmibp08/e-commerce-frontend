import Navbar from "../Navigation/Navbar"

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
