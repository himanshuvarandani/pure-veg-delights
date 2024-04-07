const CategoriesLoading = () => {
  return (
    <div className="bg-orange-500 py-10 px-5 sm:px-10 lg:px-20">
      <h3 className="text-2xl text-white text-center font-bold mb-2">
        Categories
      </h3>
      <div className="flex flex-wrap justify-between items-center">
        <div
          className="w-48 h-10 bg-gray-300 rounded-full sm:text-xl text-center m-2 cursor-pointer"
        />
        <div
          className="w-48 h-10 bg-gray-300 rounded-full sm:text-xl text-center m-2 cursor-pointer"
        />
        <div
          className="w-48 h-10 bg-gray-300 rounded-full sm:text-xl text-center m-2 cursor-pointer"
        />
        <div
          className="w-48 h-10 bg-gray-300 rounded-full sm:text-xl text-center m-2 cursor-pointer"
        />
        <div
          className="w-48 h-10 bg-gray-300 rounded-full sm:text-xl text-center m-2 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default CategoriesLoading
