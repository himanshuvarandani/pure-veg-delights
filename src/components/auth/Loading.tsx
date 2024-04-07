const AuthLoading = () => {
  return (
    <div className="flex justify-center py-10 px-4 sm:px-10">
      <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/5 border-2 border-yellow-500 rounded-xl">
        <div className="w-full flex flex-col space-y-5 p-5 sm:px-10">
          <div className="w-full flex justify-center">
            <div className="w-40 h-8 bg-gray-300" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="w-40 h-8 bg-gray-300" />
            <div className="w-full h-16 rounded-xl bg-gray-300" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="w-40 h-8 bg-gray-300" />
            <div className="w-full h-16 rounded-xl bg-gray-300" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="w-40 h-8 bg-gray-300" />
            <div className="w-full h-16 rounded-xl bg-gray-300" />
          </div>
          <div className="w-full flex justify-center">
            <div className="w-40 h-12 rounded-xl bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLoading
