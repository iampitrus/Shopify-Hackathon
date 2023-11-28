//get all the icons
// on click, hide the empty checkbox
// show the spinner
// 3 seconds later, show the check icon

function app() {
  const HIDDEN_CLASS = "hidden";
  const MARK_AS_DONE_CLASS = "checkbox-done";
  // focus on input div
  // submit on press enter
  const search = document.querySelector("#search");
  const searchInput = document.querySelector("#search input");
  searchInput.addEventListener("focus", () => {
    search.focus();
    progressTrack.classList.add("progress-track-complete");
  });

  // Remove Trial dialog
  const dialog = document.querySelector("#top-dialog");
  const closeDialog = document.querySelector("#close-top-dialog");
  closeDialog.addEventListener("click", () => dialog.classList.add("hidden"));

  // Progress bar
  const progressTrack = document.querySelector("#progress-track");
  // a variable controls the width of the progress track
  // will increase by 20% its width
  // when it reaches 100% the border is curved

  // setup menu toggler
  const menuTrigger = document.querySelector("#setup-menu");
  const menuOptions = document.querySelector("#setup-options");

  menuTrigger.addEventListener("click", () => {
    const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
    menuOptions.classList.toggle(HIDDEN_CLASS);
    if (isExpanded) {
      menuTrigger.ariaExpanded = false;
    } else {
      menuTrigger.ariaExpanded = true;
    }
  });

  // get the li
  // check which item of the list is clicked, then focused and expand, hence add the class of setup-options-item-expanded to li and remove the hidden class
  // well be having only one state variable
  const setupItems = [
    {
      index: 0,
      title: "Customize your online store",
      caption:
        "Choose a theme and add your logo, colors, and images to reflect your brand. Learn more",
      buttonCaption: "Customize theme",
    },
    {
      index: 1,
      title: "Add your first product",
      caption:
        "Write a description, add photos, and set pricing for the products you plan to sell.",
      buttonCaption: "Add product",
    },
    {
      index: 2,
      title: "Add a custom domain",
      caption:
        "Your current domain is 222219.myshopify.com but you can add a custom domain to help customers find your online store.",
      buttonCaption: "Add domain",
    },
    {
      index: 3,
      title: "Name your store",
      caption:
        "Your temporary store name is currently Davii collections. The store name appears in your admin and your online store.",
      buttonCaption: "Name store",
    },
    {
      index: 4,
      title: "Set up a payment provider",
      caption:
        "Choose a payment provider to start accepting payments. You’ll need to create an account with the payment provider and set it up with your Shopify store.",
      buttonCaption: "Set up payment",
    },
  ];
  const expandSetup = document.querySelector("#setup-options-item");
  const expandSetups = document.querySelectorAll("#setup-options-item");
  console.log(expandSetups.item(0));

  const mappedOptions = setupItems.map(
    ({ index, caption, title, buttonCaption }) => {
      return;
      ` <li
          id="setup-options-item"
          tabindex="0"
          role="menuitem"
          class="setup-options-item"
          key=${index}
        >
          <div>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
            >
              <circle
                cx="16"
                cy="16"
                r="12"
                stroke="#8A8A8A"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="4 6"
              />
            </svg>
          </div>
          <div class="setup-content">
            <div
              class="setup-content-header"
              id="setup-content-menu"
              class="setup-content-menu"
              aria-haspopup="true"
              aria-expanded="false"
              aria-controls="setup-content"
            >
              <h2 class="setup-heading">Customize your online store</h2>
            </div>
            <div
              class="setup-content-menu"
              role="menu"
              id="setup-content"
              aria-labelledby="setup-content-menu"
            >
              <p>
                Choose a theme and add your logo, colors, and images to reflect
                your brand.
              </p>{" "}
              <span>Learn more</span>
              <button>Customize theme</button>
            </div>
          </div>
        </li>`;
    }
  );

  const checkboxButton = document.querySelector("#shopping-item-checkbox");
  const notCompletedIcon = checkboxButton.querySelector("#not-completed-icon");
  const loadingIcon = checkboxButton.querySelector("#loading-icon");
  const completedIcon = checkboxButton.querySelector("#completed-icon");

  function markDone() {
    notCompletedIcon.classList.add(HIDDEN_CLASS);
    loadingIcon.classList.remove(HIDDEN_CLASS);
    setTimeout(() => {
      completedIcon.classList.remove(HIDDEN_CLASS);
      loadingIcon.classList.add(HIDDEN_CLASS);
      checkboxButton.classList.add(MARK_AS_DONE_CLASS);
    }, 1000);
  }

  function markNotDone() {
    completedIcon.classList.add(HIDDEN_CLASS);
    loadingIcon.classList.remove(HIDDEN_CLASS);
    setTimeout(() => {
      loadingIcon.classList.add(HIDDEN_CLASS);
      notCompletedIcon.classList.remove(HIDDEN_CLASS);
    }, 1000);
  }

  function handleMarkDoneOrNoteDone() {
    const markasDone = checkboxButton.classList.contains(MARK_AS_DONE_CLASS);
    if (markasDone) {
      markNotDone();
    } else {
      markDone();
    }
  }

  checkboxButton.addEventListener("click", handleMarkDoneOrNoteDone);
}

app();
