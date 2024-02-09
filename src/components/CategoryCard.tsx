import Link from "next/link"

type PropsType = { category: string }

const CategoryCard = ({ category }: PropsType) => {
  return (
    <Link
      href={`/products?q=${category}`}
      className="bg-white rounded-full w-40 sm:text-xl text-center m-2 py-2 px-5 cursor-pointer"
    >
      {category}
    </Link>
  )
}

export default CategoryCard
