import { get } from "@vercel/blob";

export default async function handler(req, res) {
  const { fileName } = req.query;

  if (!fileName) {
    return res
      .status(400)
      .json({ success: false, message: "Missing fileName." });
  }

  try {
    // Fetch the file from Blob Storage
    const file = await get(fileName);

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "File not found." });
    }

    res.status(200).json({
      success: true,
      data: file.body,
      blobUrl: file.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve file.",
        error: error.message,
      });
  }
}
