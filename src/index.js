// @ts-check

import puppeteer from "puppeteer";

// Launch the browser (adjust headless as you like)
const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
}); // or true/false

// Create a blank page
const page = await browser.newPage();

const floatLiteral = 3.779528; // The problematic float from your example

console.log("floatLiteral before evaluate:", floatLiteral);

// Execute your diagnostic code in the browser context
const result = await page.evaluate((value) => {
    // Direct interpretation of the literal
    const literal = 3.779528;

    // Passing the value from Node.js context to browser context
    const passedValue = value;

    // Basic arithmetic to see if it's affected
    const multiplied = literal * 2;
    const divided = literal / 2;
    const added = literal + 0.000001; // Small addition to confirm precision

    return {
        literal,
        literal_type: typeof literal,
        literal_toString: literal.toString(),
        literal_toFixed: literal.toFixed(6), // Format to 6 decimal places

        passedValue,
        passedValue_type: typeof passedValue,
        passedValue_toString: passedValue.toString(),
        passedValue_toFixed: passedValue.toFixed(6),

        multiplied,
        divided,
        added,

        // userAgent: navigator.userAgent,
        anotherFloat: 1.234567,
        anotherFloat_toFixed: (1.234567).toFixed(6),
    };
}, floatLiteral); // Pass the same float from Node.js context

// Pretty‑print the results
console.log("\n--- Test Results ---");
console.log(JSON.stringify(result, null, 2));

await browser.close();
