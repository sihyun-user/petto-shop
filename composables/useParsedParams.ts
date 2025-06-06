interface ParsedParams {
  pet_type?: string
  category?: string
  subcategory?: string
}

function detectPetType(value: string): '貓' | '狗' | undefined {
  if (value.includes('貓')) return '貓'
  if (value.includes('狗')) return '狗'
  return undefined
}

export function useParsedParams(slug: string[] = []): ParsedParams {
  let pet_type: string | undefined
  let category: string | undefined
  let subcategory: string | undefined

  if (slug.length === 1) {
    const detectedPet = detectPetType(slug[0])
    if (detectedPet) {
      pet_type = detectedPet
    } else {
      category = slug[0]
    }
  } else if (slug.length === 2) {
    const detectedPet = detectPetType(slug[0])
    if (detectedPet) {
      pet_type = detectedPet
      category = slug[1]
    } else {
      category = slug[0]
      subcategory = slug[1]
    }
  } else if (slug.length >= 3) {
    const detectedPet = detectPetType(slug[0])
    if (detectedPet) {
      pet_type = detectedPet
    } else {
      pet_type = slug[0]
    }
    category = slug[1]
    subcategory = slug[2]
  }

  return { pet_type, category, subcategory }
}
