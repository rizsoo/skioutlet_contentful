import { put } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fileName or content." });
    }

    try {
      // Upload or overwrite the CSV file
      const result = await put(fileName, content, { contentType: "text/csv" });

      res.status(200).json({
        success: true,
        message: "File uploaded/updated successfully.",
        blobUrl: result.url,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to upload file.",
          error: error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method not allowed" });
  }
}
