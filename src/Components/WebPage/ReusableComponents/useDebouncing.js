import React, { useEffect, useMemo, useState } from 'react'

const useDebouncing = () => {

    const [value, setValue] = useState("")
    const [value1, setValue1] = useState("")


    useEffect(() => {

        const myInterval = setTimeout(() => {
            setValue1(value)
        }, 300);

        return () => clearTimeout(myInterval);

    }, [value])

    return [value1, setValue]





}

export default useDebouncing