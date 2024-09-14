(function () {
  // "use strict";
  function modify_title(title) {
    console.log(title);
    let number = title.split(".")[0].trim();
    console.log(number);
    let mod_number = "";
    let cat =
      "https://raw.githubusercontent.com/akhilkammila/leetcode-screenshotter/main/editorial-screenshots/";

    if (number.length < 3 && number.length > 1) {
      mod_number = "0" + number;
    } else if (number.length < 3) {
      mod_number = "00" + number;
    } else mod_number = number;
    console.log(mod_number);
    title = title.replace(number, mod_number).replaceAll(" ", "%20") + ".png";
    title =
      number.length < 999
        ? cat + "1-999/" + title
        : number > 999 && number < 2000
        ? cat + "1000-1999" + title
        : cat + "2000-2999" + title;
    // console.log(title);
    return title;
  }
  const isLock = (selector) => {
    return new Promise((resolve) => {
      const checkElement = () => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else {
          requestAnimationFrame(checkElement); // Keep checking until the element is found
        }
      };
      checkElement();
    });
  };
  const isElementLoaded = async (selector) => {
    while (document.querySelector(selector) === null) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
  };

  console.log("lc Editorial On");
  isLock(
    "#qd-content > div:nth-child(1) > div:nth-child(4) > div > div > div > div > div > a"
  ).then(async (selector) => {
    var title = selector.innerHTML;
    var urlSlug = modify_title(title);
    console.log(urlSlug);

    // var editorial = document.querySelector('#editorial_tab > div:nth-child(2) > div');
    var editorial = document.querySelector(
      "#qd-content > div > div:nth-child(5) "
    );

    if (
      document.querySelector("#solution-article") ||
      document.querySelector("#solution") ||
      document.querySelector("#video-article")
    ) {
      console.log("Solution does exist");
    } else {
      console.log("Does not exist");
      editorial.innerHTML = `<img src="${urlSlug}">`;
    }
    // var lockSelector = document.querySelector(
    //   "#qd-content > div > div:nth-child(5) > div"
    // );

    const lockSelector = "#qd-content > div > div:nth-child(5) > div";
    isElementLoaded(lockSelector).then((lock) => {
      if (lock) {
        console.log("Attempting to remove div");
        editorial.removeChild(lock);
        // lock.removeChild(lock.firstChild);
        console.log("Div removed successfully");
      } else {
        console.log("Lock element not found");
      }
    });





})();
