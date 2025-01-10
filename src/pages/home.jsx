import { Header } from "../components/header/header"
import { DataTable } from "../components/product/product-list"
import { ProductCreate } from "../components/product/product-create"

export const Home = () => {
  return (
    <section>
      <Header />

      <main className="w-full flex flex-col ">
        <div className="sm:w-10/12 md:w-full flex flex-row items-center mt-16 md:pl-12 md:ml-32 ml-20">
          <h1 className=" w-8/12 font-semibold flex md:flex-none gap-5 sm:flex-row md:text-3xl  md:py-5 md:ml-3">Produtos</h1>

          <div className="sm:w-[25%] md:w-auto justify-items-end">
            <ProductCreate />
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col mt-5">
          <DataTable />
        </div>
      </main>
    </section>
  )
}