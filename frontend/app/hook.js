import { useDispatch, useSelector } from 'react-redux'


export const useForm =
  (defaultValues) =>
  (handler) =>
  async (event) => {
    event.preventDefault()
    event.persist()

    const form = event.target
    const elements = Array.from(form.elements)
    const data = elements
      .filter((element) => element.hasAttribute('name'))
      .reduce(
        (object, element) => ({
          ...object,
          [`${element.getAttribute('name')}`]: element.value,
        }),
        defaultValues
      )
    await handler(data)
    form.reset()
  }

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch()

export const useAppSelector = useSelector