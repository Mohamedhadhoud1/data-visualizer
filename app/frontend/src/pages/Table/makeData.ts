export type Person = {
  Name: string
  Mail: string
  Montantdevente: string
  Datededebut: string
  Datedefin: string 
  Formation: string
Formationaffectée: string
LIENDIGIFORMA: string
Seller: string,
  subRows?: Person[]
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const Data = (): Person => {
  return {
    Name: "BARILLE Mathilde",
    Mail: "mathilde.barille@gmail.com",
    Montantdevente: "1,635.00 €",
    Formation: "CREATION D'ENTREPRISE",
    Datededebut: "11/10/2023",
     Datedefin: "25/10/2023",
    Formationaffectée: "OUI",
    LIENDIGIFORMA: "https://app.digiforma.com/r/z6Wp59SO",
    Seller: "Marie",
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...Data(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}