import { useQuery } from "@tanstack/react-query"
import { sectionService } from "@/services/section_service"
import type { SectionItem, SectionWithItems } from "src/types"

export function BookmarksContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: sectionService.getAllSectionsWithItems,
    cacheTime: 0
  })


  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Something went wrong!</p>
  }

  return (
    <>
      {data.length === 0 && (
        <h1 className="text-center text-lg font-bold">No bookmarks!</h1>
      )}
      <SectionsContainer bookmarks={data} />
    </>
  )
}

function SectionsContainer({ bookmarks }: { bookmarks: SectionWithItems[] }) {
  return (
    <ul className="flex gap-8 flex-wrap w-full justify-center">
      {bookmarks.map((e) => (
        <li key={e.section.id}>
          <h1 className="text-2xl font-bold">{e.section.title}</h1>
          <SectionItemsContainer items={e.items} />
        </li>
      ))}
    </ul>
  )
}

function SectionItemsContainer({ items }: { items: SectionItem[] }) {
  return (
    <ul className="flex flex-col items-center justify-center">
      {items.map((e) => (
        <li key={e.id}>
          <a href={e.url} className="text-lg text-center hover:underline hover:underline-primary hover:text-primary" target="_blank">{e.title}</a>
        </li>
      ))}
    </ul>
  )
}
