export type Person = {
    folderNumber:string
  seller:string
  name:string
  mail:string
  salesAmount:string
  course:string
  dateStartCourse:string
  dateEndCourse:string
  courseAcivated:string
  courseLink:string
  courseCode:string
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
    folderNumber: "N° 39412668451",
      salesAmount: "3,200.00 €",
      seller: "Amine",
      name:"BACHIR Ridwane",
      mail:"Ridwane69310@icloud.com",
      course: "CREATION D'ENTREPRISE",
      dateStartCourse: "11/10/2023",
      dateEndCourse: "25/10/2023",
      courseAcivated: "OUI",
      courseLink: "https://app.digiforma.com/r/80Lislhu",
      courseCode: "test",
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