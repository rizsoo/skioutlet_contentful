export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Cron job triggered!");

    // Logic for POST requests (e.g., triggering Vercel API)
    const vercelApiUrl =
      "https://api.vercel.com/v1/integrations/deploy/prj_iicM7lRil6yfXhzwZ4MqHFYKhy1x/1pcM1lcEHr";

    try {
      const response = await fetch(vercelApiUrl, { method: "POST" });

      if (!response.ok) {
        console.error(
          "Failed to trigger Vercel deploy:",
          await response.text()
        );
        return res
          .status(500)
          .json({ ok: false, error: "Vercel API call failed" });
      }

      res.status(200).json({ ok: true, message: "Vercel deploy triggered" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ ok: false, error: "Unexpected error occurred" });
    }
  } else if (req.method === "GET") {
    // Optional logic for GET requests
    res.status(200).json({
      ok: true,
      message: "GET request received but not triggering the API",
    });
  } else {
    // For all other methods, return 405 Method Not Allowed
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
