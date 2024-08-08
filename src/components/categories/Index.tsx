import api from "@/axios/instance"
import { AxiosError } from "axios"
import Link from "next/link"

const Categories = async () => {
  const fetchCategories = async (): Promise<Array<string>> => {
    return await api.get("/categories")
      .then(response => response.data.categories as Array<string>)
      .catch((error: AxiosError) => {
        console.log("Error Fetching Categories ->", error)
        return []
      })
  }
  const categories = await fetchCategories()

  return (
    <div className="bg-orange-500 py-10 px-5 sm:px-10 lg:px-20">
      <h3 className="text-2xl text-white text-center font-bold mb-2">
        Categories
      </h3>
      <div className="flex flex-wrap justify-between items-center">
        {categories.map(category => (
          <Link
            key={category}
            href={`/products?q=${category}`}
            className="bg-white rounded-full sm:text-xl text-center m-2 py-2 px-5 sm:px-8 cursor-pointer"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
