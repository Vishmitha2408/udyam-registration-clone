const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // use headless: false to debug
  const page = await browser.newPage();

  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  // Wait for iframe to load
  await page.waitForSelector("iframe");

  // Get the iframe element
  const frameHandle = await page.$("iframe");
  const frame = await frameHandle.contentFrame();

  // Wait for Aadhaar field inside the iframe
  await frame.waitForSelector("#ctl00_ContentPlaceHolder1_txtAadhaar");

  // Extract form fields inside the iframe
  const step1 = await frame.evaluate(() => {
    return {
      aadhaar: {
        label: "Aadhaar Number",
        type: "text",
        selector: "#ctl00_ContentPlaceHolder1_txtAadhaar",
        validation: "^[2-9]{1}[0-9]{11}$"
      },
      name: {
        label: "Name of Entrepreneur",
        type: "text",
        selector: "#ctl00_ContentPlaceHolder1_txtName"
      },
      otp: {
        label: "OTP",
        type: "text",
        selector: "#ctl00_ContentPlaceHolder1_txtOTP",
        validation: "^[0-9]{6}$"
      }
    };
  });

  const step2 = {
    pan: {
      label: "PAN Number",
      type: "text",
      validation: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
    },
    enterpriseName: {
      label: "Enterprise Name",
      type: "text"
    }
  };

  const schema = { step1, step2 };

  fs.writeFileSync("udyam_form_schema.json", JSON.stringify(schema, null, 2));
  console.log("✅ Form schema extracted successfully!");

  await browser.close();
})();
