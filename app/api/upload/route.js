import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.formData();

    for (const [fieldName, formDataEntry] of formData.entries()) {
        console.log(formData)
      if (typeof formDataEntry === "object" && "arrayBuffer" in formDataEntry) {
        const file = formDataEntry;
        
        // Get the ArrayBuffer from formDataEntry
        const arrayBuffer = await file.arrayBuffer();
        
        // Create a Buffer from the ArrayBuffer
        const buffer = Buffer.from(arrayBuffer);
    
        fs.writeFileSync(`static/${file.name}`, buffer);
      }else{
        console.log('FROM ELSE GROUP', formDataEntry)
      }
    }
    
  return NextResponse.json({ success: true });
}

// other way of same function
// courtesy https://reacthustle.com/blog/how-to-create-react-multiple-file-upload-using-nextjs-and-typescript

// export async function POST(req) {
//   const formData = await req.formData()
//   console.log('FORM_DATA', formData)
//   const formDataEntryValues = Array.from(formData.values())
//   for (const formDataEntryValue of formDataEntryValues) {
//     if (
//       typeof formDataEntryValue === "object" &&
//       "arrayBuffer" in formDataEntryValue
//     ) {
//       const file = formDataEntryValue
//       const buffer = Buffer.from(await file.arrayBuffer())
//       fs.writeFileSync(`static/${file.name}`, buffer)
//     }
//   }
//   return NextResponse.json({ success: true })
// }