const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeUdyamFormFields() {
  try {
    const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(response.data);
    const formFields = [];

    $("input, select, textarea").each((i, elem) => {
      const tag = $(elem)[0].tagName;
      const name = $(elem).attr("name") || "";
      const type = $(elem).attr("type") || "text";
      const id = $(elem).attr("id") || "";
      const placeholder = $(elem).attr("placeholder") || "";
      const label = $(`label[for="${id}"]`).text().trim();

      formFields.push({ tag, name, type, id, label, placeholder });
    });

    fs.writeFileSync("formSchema.json", JSON.stringify(formFields, null, 2));
    console.log("✅ Scraped fields saved to formSchema.json");
  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
  }
}

scrapeUdyamFormFields();
