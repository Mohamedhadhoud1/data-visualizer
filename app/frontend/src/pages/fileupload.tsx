import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface DataItem {
  key: string;
  // ... other columns
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transformedData, setTransformedData] = useState<DataItem[]>([]);

  const handleUpload = async () => {
    if (file) {
      try {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const firstSheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheetName];

            // Assuming headers are in the second row (0-indexed)
            const headers: string[] = (
              XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                range: 1, // Use the second row as headers
              }) as any
            )[0].map((header: any) => String(header));

            const excelData: DataItem[] = XLSX.utils.sheet_to_json(sheet, {
              header: headers,
            });

            setTransformedData(excelData);
            console.log(excelData);
          }
        };
        fileReader.readAsBinaryString(file);
      } catch (error) {
        console.error("Error while processing Excel file:", error);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Display transformed data */}
      {transformedData.length > 0 && (
        <div>
          <h2>Transformed Data</h2>
          <pre>{JSON.stringify(transformedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
/*interface Difference {
  key: string;
  oldValue: any;
  newValue: any;
}

const findDifferences = (obj1: any, obj2: any, path: string[] = []): Difference[] => {
  const differences: Difference[] = [];

  for (const key in obj1) {
    const newPath = [...path, key];

    if (obj2.hasOwnProperty(key)) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        // Recursively compare nested objects
        differences.push(...findDifferences(obj1[key], obj2[key], newPath));
      } else if (obj1[key] !== obj2[key]) {
        // Values are different
        differences.push({
          key: newPath.join("."),
          oldValue: obj1[key],
          newValue: obj2[key],
        });
      }
    } else {
      // Key is present in obj1 but not in obj2
      differences.push({
        key: newPath.join("."),
        oldValue: obj1[key],
        newValue: undefined,
      });
    }
  }

  // Check for keys present in obj2 but not in obj1
  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      differences.push({
        key: [...path, key].join("."),
        oldValue: undefined,
        newValue: obj2[key],
      });
    }
  }

  return differences;
};

// Example usage
const obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: [4, 5],
};

const obj2 = {
  a: 1,
  b: {
    c: 2,
    d: 99,
  },
  f: "new property",
};

const differences = findDifferences(obj1, obj2);
console.log(differences);
*/