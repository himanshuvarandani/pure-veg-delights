import CategoryCard from "./CategoryCard"

const CategoriesList = () => {
  return (
    <div className="flex flex-wrap justify-around">
      <CategoryCard category="Breakfast" />
      <CategoryCard category="Meals" />
      <CategoryCard category="Snacks" />
      <CategoryCard category="Rice" />
      <CategoryCard category="Breads" />
      <CategoryCard category="Lunch" />
      <CategoryCard category="Dinner" />
    </div>
  )
}

export default CategoriesList
