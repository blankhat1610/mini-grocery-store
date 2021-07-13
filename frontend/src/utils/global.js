global.drawerWidth = 240;

export const adminFeatureList = [
  { id: 1, value: "Products" },
  { id: 2, value: "Category" },
  { id: 3, value: "Order" },
  { id: 4, value: "Employee" },
];

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
