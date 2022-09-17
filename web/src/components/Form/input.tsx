import { InputHTMLAttributes } from 'react'

interface InputeProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputeProps) {
  return (
    <input
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  )
}
