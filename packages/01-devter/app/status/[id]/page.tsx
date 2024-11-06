import { Suspense } from 'react';

import Devit from "@/app/ui/devit/devit"
import { fetchDevitById } from "@/firebase/client"

export default async function DevitPage({ params }: {params: { id: string }}) {
  const id = params.id
  const data = await fetchDevitById(id)
  const devit = data[0]

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* @ts-expect-error: check devit type */}
        <Devit {...devit} />
      </Suspense>
    </>
  )
}
