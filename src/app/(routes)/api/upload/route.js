import { NextResponse } from "next/server";
import { pinata } from "../../../utils/config"


export async function POST(request) {
  try {
    const data = await request.formData();

    const file = data.get("file");
    console.log(file);

    // Ensure the file is a valid Blob or File
    if (!(file instanceof File || file instanceof Blob)) {
      throw new TypeError("The 'file' field must be a valid File or Blob.");
    }

    const uploadData = await pinata.upload.file(file , {
      groupId : "01936230-7bfa-7622-b654-2fa46169a2cb" 
    });
    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600 * 24 *365 ,
    });

    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}