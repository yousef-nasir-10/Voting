import React from 'react'

function CandidateInput({name, isOptional, value, handleChange}) {
  return (
    <div className={`w-[300px]] ${name === "title" ? "w-full" : ""}`}>
      {/* <div className="flex justify-between">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {""}
        </label>
        <span className="text-sm leading-6 text-gray-500" id="email-optional">
          {isOptional? "Optional": "Required"}
        </span>
      </div> */}
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id="text"
          value={value}
          onChange={handleChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={`${name}  ${isOptional? "- Optional" : ""}`}
          aria-describedby="email-optional"
        />
      </div>
    </div>
  )
}

export default CandidateInput
