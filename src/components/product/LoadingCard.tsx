type PropsType = {
  theme: "white" | "orange"
}

const ProductLoadingCard = ({ theme }: PropsType) => {
  return (
    <div 
      className={`w-full sm:w-60 border-2 rounded-xl overflow-hidden flex sm:flex-col sm:justify-between shadow-xl m-2
        ${theme === "white" ? "border-yellow-500" : "border-white"}
      `}
    >
      <div className="h-full w-20 xs:w-28 sm:w-full sm:h-40 bg-gray-300" />
      <div className="flex flex-1 flex-col justify-between py-2 sm:py-5 px-3">
        <div className="w-48 h-8 bg-gray-300 mb-2" />
        <div>
          <div className="w-20 h-8 bg-gray-300 mb-4" />
          <div className="w-full flex justify-center">
            <div className="w-full h-10 sm:h-12 rounded-xl bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductLoadingCard
