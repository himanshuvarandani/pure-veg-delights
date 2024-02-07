type PropsType = { category: string }

const CategoryCard = ({ category }: PropsType) => {
  return (
    <div className="border-2 border-yellow-500 rounded-full w-40 m-2 py-2 px-5 cursor-pointer">
      <p className="sm:text-xl text-center">{category}</p>
    </div>
  )
}

export default CategoryCard
