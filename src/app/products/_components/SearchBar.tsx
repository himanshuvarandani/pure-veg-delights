"use client"

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      replace(`${pathname}?q=${term}`)
    } else {
      replace(`${pathname}`)
    }
  }, 500)

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams.get("q")])

  return (
    <div className="flex border-2 border-orange-550 rounded-3xl overflow-hidden pl-2 mx-2">
      <input
        className="bg-transparent text-orange-550 placeholder-orange-550 my-1 mx-2 p-1 focus:outline-0"
        placeholder="Search a product ..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value.trim())
          handleSearch(e.target.value.trim())
        }}
      />
      <button className="bg-orange-550 flex items-center text-orange-600 px-2">
        <FontAwesomeIcon icon={faSearch} height={15} className="text-white" />
      </button>
    </div>
  )
}

export default SearchBar
