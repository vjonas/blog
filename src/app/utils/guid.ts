const generateGuid = () => {
  const nav = window.navigator;
  const screen = window.screen;
  let guid: any = nav.mimeTypes.length;

  guid += nav.userAgent.replace(/\D+/g, "");
  guid += nav.plugins.length;
  guid += screen.height || "";
  guid += screen.width || "";
  guid += screen.pixelDepth || "";

  return guid;
};

export const getSetGuid = (): string => {
  let guid = localStorage.getItem("guid") || generateGuid();

  localStorage.setItem("guid", guid);
  return guid;
};
