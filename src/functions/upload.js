import { uploadData } from "aws-amplify/storage";

async function uploadFile(file) {
  const key = `uploads/${file.name}`;

  try {
    const result = await uploadData({ key, data: file });

    console.log(`File uploaded successfully: ${result.key}`);
  } catch (error) {
    console.error("Error uploading file to S3", error);
  }
}

export default uploadFile;
