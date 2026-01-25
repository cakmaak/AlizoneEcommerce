export const showToast = (type, message) => {
  window.dispatchEvent(
    new CustomEvent("toast", {
      detail: { type, message },
    })
  );
};