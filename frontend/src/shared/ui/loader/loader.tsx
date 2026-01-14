import './loader.css'

export const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div
          className={`bg-text-neutral-tertiary animate-float size-2 rounded-full ![animation-delay:-0.3s]`}
        />
        <div
          className={`bg-text-neutral-tertiary animate-float size-2 rounded-full ![animation-delay:-0.15s]`}
        />
        <div
          className={`bg-text-neutral-tertiary animate-float size-2 rounded-full`}
        />
      </div>
    </div>
  )
}
