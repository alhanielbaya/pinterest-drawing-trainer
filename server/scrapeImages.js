const puppeteer = require("puppeteer");
const path = require("path");

const loginButton =
  "#__PWS_ROOT__ > div:nth-child(1) > div > div > div > div:nth-child(2) > div.Jea._he.b8T.gjz.zI7.iyn.Hsu > div.Jea.l7T.zI7.iyn.Hsu > div:nth-child(2) > button";
const nameInput = "#email";
const passInput = "#password";
const confirm =
  "#__PWS_ROOT__ > div:nth-child(1) > div > div > div > div:nth-child(2) > div.Jea.MIw.TpD.mQ8.sLG.zI7.iyn.Hsu > div.Jea.MIw.QLY.Rym.jzS.mQ8.ojN.p6V.prG.sLG.zI7.iyn.Hsu > div > div > div > div > div > div > div > div:nth-child(4) > form > div:nth-child(5) > button";

const email = process.env.email;
const password = process.env.password;

function extractItems(oldArr) {
  const images = Array.from(document.images);
  const newArr = [];
  images.forEach((e) => {
    // Checks Image height
    if (
      e.clientHeight > 200 &&
      e.clientWidth > 200 &&
      // Checks if image is ad
      e.alt.includes("This contains an image of:")
    ) {
      newArr.push({
        src: e.src,
        height: e.clientHeight,
        width: e.clientWidth,
        srcset: e.srcset
          // turn into array
          .split(",")
          .map((v) => v.slice(0, v.length - 2)),
      });
    }
  });
  const mergedArr = [...new Set([...oldArr, ...newArr])];

  return mergedArr;
}

async function scrapeInfiniteScrollItems(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000
) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems, items);
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`
      );
      await page.waitForTimeout(scrollDelay);
    }
  } catch (e) {
    throw console.error(e);
  }
  return items;
}

async function scrapeImages(target) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.pinterest.com/");

  // LOGIN START
  await page.waitForSelector(loginButton);
  await page.click(loginButton);

  await page.waitForSelector(nameInput);
  await page.waitForSelector(passInput);
  await page.waitForSelector(confirm);

  await page.type(nameInput, email, { delay: 100 });
  await page.type(passInput, password, { delay: 100 });

  await page.click(confirm);
  await page.waitForTimeout(3000);
  await page.screenshot({
    // Screenshot the website using defined options

    path: "./screenshot.png", // Save the screenshot in current directory

    fullPage: true, // take a fullpage screenshot
  });
  // LOGIN END

  const images = await scrapeInfiniteScrollItems(page, extractItems, target);

  await browser.close();

  return images;
}

module.exports = {
  scrapeImages,
};
